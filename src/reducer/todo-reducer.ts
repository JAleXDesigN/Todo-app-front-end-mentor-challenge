import { arrayMove } from "@dnd-kit/sortable";

import { storeValue } from "../helpers";

export const toDoReducer = (state: State, action: Actions) => {
  const { type } = action;

  if (type === "SET_STORED_TASKS") {
    return {
      ...state,
      loading: false,
      tasks: action.payload,
    };
  }

  if (type === "CANCEL_LOADING") {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === "ADD_TASK") {
    const newTask: Task = {
      id: Date.now(),
      taskName: action.payload,
      completed: false,
    };

    const updatedTasks = [...state.tasks, newTask];
    storeValue("tasks", updatedTasks);

    return {
      ...state,
      tasks: updatedTasks,
    };
  }

  if (type === "REMOVE_TASK") {
    const updatedTasks = state.tasks.filter(
      (task) => task.id !== action.payload
    );

    storeValue("tasks", updatedTasks);

    return {
      ...state,
      tasks: updatedTasks,
    };
  }

  if (type === "TOGGLE_TASK_STATUS") {
    const updatedTasks = state.tasks.map((task) =>
      task.id === action.payload
        ? { ...task, completed: !task.completed }
        : task
    );

    storeValue("tasks", updatedTasks);

    return {
      ...state,
      tasks: updatedTasks,
    };
  }

  if (type === "SET_FILTER") {
    return {
      ...state,
      filter: action.payload,
    };
  }

  if (type === "REORDER_TASKS") {
    const oldIndex = state.tasks.findIndex(
      (item) => item.id === action.payload.activeId
    );
    const newIndex = state.tasks.findIndex(
      (item) => item.id === action.payload.overId
    );

    const updatedTasks = arrayMove(state.tasks, oldIndex, newIndex);
    storeValue("tasks", updatedTasks);

    return {
      ...state,
      tasks: updatedTasks,
    };
  }

  if (type === "CLEAR_COMPLETED") {
    const updatedTasks = state.tasks.filter((task) => !task.completed);
    storeValue("tasks", updatedTasks);

    return {
      ...state,
      tasks: updatedTasks,
    };
  }

  return state;
};
