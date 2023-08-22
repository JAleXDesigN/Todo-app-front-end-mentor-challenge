import type { DragEndEvent } from "@dnd-kit/core";
import { useReducer, useMemo, useCallback, useEffect } from "react";

import { filterTasks } from "../helpers";
import { toDoReducer } from "../reducer/todo-reducer";

const initialState: State = {
  loading: true,
  tasks: [],
  filter: "All",
};

export const useTodoStore = (): TodoStoreReturn => {
  const [state, dispatch] = useReducer(toDoReducer, initialState);
  const tasks = useMemo(() => filterTasks(state), [state]);

  const todoLabels = useMemo(() => {
    const { filter } = state;

    const itemsLength =
      filter === "All"
        ? tasks.filter((task) => !task.completed).length
        : tasks.length;
    const isSingular = itemsLength === 1;
    const itemsLeft = `${itemsLength} ${isSingular ? "item" : "items"}`;

    return {
      mainLabel:
        filter === "All"
          ? "No tasks added, start adding one!"
          : filter === "Completed"
          ? "No completed tasks yet."
          : "No active tasks yet.",
      itemsLeft: `${itemsLeft} ${filter === "All" ? "left" : filter}`,
    };
  }, [state, tasks]);

  const handleAddTodo = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const taskText = new FormData(form).get("task")?.toString().trim();

    if (taskText) {
      dispatch({ type: "ADD_TASK", payload: taskText });
      form.reset();
    }
  }, []);

  const handleRemoveTask = useCallback((taskId: number) => {
    dispatch({ type: "REMOVE_TASK", payload: taskId });
  }, []);

  const handleToggleTask = useCallback((taskId: number) => {
    dispatch({ type: "TOGGLE_TASK_STATUS", payload: taskId });
  }, []);

  const handleFilterChange = useCallback((filter: FilterType) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  }, []);

  const reorderTask = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      dispatch({
        type: "REORDER_TASKS",
        payload: { activeId: active.id, overId: over.id },
      });
    }
  }, []);

  const clearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (!storedTasks) {
      dispatch({ type: "CANCEL_LOADING" });
    } else {
      dispatch({
        type: "SET_STORED_TASKS",
        payload: JSON.parse(storedTasks) as Task[],
      });
    }
  }, []);

  return {
    loading: state.loading,
    tasks,
    filter: state.filter,
    todoLabels,
    handleAddTodo,
    handleRemoveTask,
    handleToggleTask,
    handleFilterChange,
    reorderTask,
    clearCompleted,
  };
};
