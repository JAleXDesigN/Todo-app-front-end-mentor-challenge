interface Task {
  id: number;
  taskName: string;
  completed: boolean;
}

interface State {
  loading: boolean;
  tasks: Task[];
  filter: FilterType;
}

type FilterType = "All" | "Completed" | "Active";
type ReorderPayload = {
  activeId: string | number;
  overId: string | number;
};

type Actions =
  | { type: "SET_STORED_TASKS"; payload: Task[] }
  | { type: "CANCEL_LOADING" }
  | { type: "ADD_TASK"; payload: string }
  | { type: "REMOVE_TASK"; payload: number }
  | { type: "TOGGLE_TASK_STATUS"; payload: number }
  | { type: "SET_FILTER"; payload: FilterType }
  | { type: "REORDER_TASKS"; payload: ReorderPayload }
  | { type: "CLEAR_COMPLETED" };

interface TodoStoreReturn {
  loading: boolean;
  tasks: Task[];
  filter: FilterType;
  todoLabels: {
    mainLabel: string;
    itemsLeft: string;
  };
  handleAddTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  handleRemoveTask: (taskId: number) => void;
  handleToggleTask: (taskId: number) => void;
  handleFilterChange: (filter: FilterType) => void;
  reorderTask: (event: DragEndEvent) => void;
  clearCompleted: () => void;
}

//Components

/**CheckButton Props */
interface CheckButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  keepChecked?: boolean;
  onChange?: () => void;
  "aria-label"?: string;
}

// Input Add Component
/**InputAddProps */
type AddTodoProps = Pick<TodoStoreReturn, "handleAddTodo">;

// TodoItem Component
/**TodoItem Props */
type TodoItemProps = Task &
  Pick<TodoStoreReturn, "handleToggleTask" | "handleRemoveTask">;

//Filters Component
/**FiltersProps */
type FiltersProps = Pick<TodoStoreReturn, "filter" | "handleFilterChange"> & {
  design: "mobile" | "desktop";
};

type ListProps = Omit<TodoStoreReturn, "handleAddTodo">;
