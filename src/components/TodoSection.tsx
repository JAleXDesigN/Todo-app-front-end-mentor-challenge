import { useTodoStore } from "../hooks";

import AddTodo from "./AddTodo";
import Filters from "./Filters";
import List from "./List";
import styles from "./TodoSection.module.scss";

const { main, todo_section, dnd_text } = styles;

const TodoSection = () => {
  const { filter, handleAddTodo, handleFilterChange, ...rest } = useTodoStore();

  return (
    <main className={main}>
      <AddTodo handleAddTodo={handleAddTodo} />

      <section className={todo_section}>
        <List
          filter={filter}
          handleFilterChange={handleFilterChange}
          {...rest}
        />

        <Filters
          design="mobile"
          filter={filter}
          handleFilterChange={handleFilterChange}
        />

        <div className={dnd_text}>Drag and drop to reorder list</div>
      </section>
    </main>
  );
};

export default TodoSection;
