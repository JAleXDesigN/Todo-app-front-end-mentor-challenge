import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import {
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { FC } from "react";

import { mergeClassNames } from "../helpers";

import Button from "./Button";
import Filters from "./Filters";
import styles from "./List.module.scss";
import TodoItem from "./TodoItem";

const { root, list, no_items, no_items_msg, actions, items_left } = styles;

const List: FC<ListProps> = ({
  loading,
  tasks,
  filter,
  todoLabels,
  reorderTask,
  handleToggleTask,
  handleRemoveTask,
  handleFilterChange,
  clearCompleted,
}) => {
  const { itemsLeft, mainLabel } = todoLabels;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className={root}>
      <div
        className={mergeClassNames({
          [list]: true,
          [no_items]: tasks.length === 0,
        })}
      >
        {!loading &&
          (tasks.length === 0 ? (
            <span className={no_items_msg}>{mainLabel}</span>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={reorderTask}
              modifiers={[
                restrictToVerticalAxis,
                restrictToWindowEdges,
                restrictToParentElement,
              ]}
            >
              <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((item) => (
                  <TodoItem
                    handleToggleTask={handleToggleTask}
                    handleRemoveTask={handleRemoveTask}
                    key={item.id}
                    {...item}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ))}
      </div>

      <div className={actions}>
        <span className={items_left}>{itemsLeft}</span>

        <Filters
          design="desktop"
          filter={filter}
          handleFilterChange={handleFilterChange}
        />

        <Button
          variant="clear"
          label="Clear completed"
          onClick={clearCompleted}
        />
      </div>
    </div>
  );
};

export default List;
