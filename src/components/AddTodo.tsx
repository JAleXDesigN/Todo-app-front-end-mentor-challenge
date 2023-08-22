import { FC } from "react";

import styles from "./AddTodo.module.scss";
import CheckButton from "./CheckButton";

const { root, input, check } = styles;

const AddTodo: FC<AddTodoProps> = ({ handleAddTodo }) => {
  return (
    <form
      className={root}
      onSubmit={handleAddTodo}
      autoComplete="off"
    >
      <CheckButton
        type="submit"
        keepChecked={false}
        className={check}
      />

      <input
        className={input}
        name="task"
        type="text"
        aria-label="Input to add new task"
        aria-autocomplete="none"
        placeholder="Create a new todo…"
      />
    </form>
  );
};

export default AddTodo;
