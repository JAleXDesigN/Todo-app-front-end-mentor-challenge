export const filterTasks = (state: State) => {
  switch (state.filter) {
    case "All":
      return state.tasks;
    case "Completed":
      return state.tasks.filter((task) => task.completed);
    case "Active":
      return state.tasks.filter((task) => !task.completed);
    default:
      return state.tasks;
  }
};
