import React, { FC } from 'react';
import { Todo } from '../../store/todos-store';

import styles from "./todo-list.module.css";

type Props = {
  todos: Todo[];
  onCompleteChange: (id: string, complete: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoList: FC<Props> = ({ todos, onDelete, onCompleteChange }) => {

  return (
    <div className={styles.container}>
      {todos.map(({ id, text, completed }) => (
        <div key={id} className={styles.todoItem}>
          <div>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => onCompleteChange(id, e.target.checked)}
            />
            <span
              style={{ textDecoration: completed ? "line-through" : "" }}
            >
              {text}
            </span>
          </div>
          <button
            onClick={() => onDelete(id)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  )
}