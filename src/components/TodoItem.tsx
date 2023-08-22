import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, type FC } from "react";

import { mergeClassNames } from "../helpers";
import { IconClose } from "../icons";

import CheckButton from "./CheckButton";
import styles from "./TodoItem.module.scss";

const { root, check, task, is_completed, is_dragging, clear_button } = styles;

const TodoItem: FC<TodoItemProps> = ({
  id,
  taskName,
  completed,
  handleToggleTask,
  handleRemoveTask,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const taskClassName = useMemo(
    () =>
      mergeClassNames({
        [root]: true,
        [is_dragging]: isDragging,
      }),
    [isDragging]
  );

  return (
    <div
      ref={setNodeRef}
      className={taskClassName}
      style={style}
    >
      <CheckButton
        className={check}
        checked={completed}
        onChange={() => handleToggleTask(id)}
        aria-label={`Mark task *${taskName}* as ${
          completed ? "active" : "completed"
        }`}
      />

      <span
        className={mergeClassNames({ [task]: true, [is_completed]: completed })}
        {...attributes}
        {...listeners}
      >
        {taskName}
      </span>

      <button
        type="button"
        aria-label={`Remove task *${taskName}*`}
        className={clear_button}
        onClick={() => handleRemoveTask(id)}
      >
        <IconClose />
      </button>
    </div>
  );
};

export default TodoItem;
