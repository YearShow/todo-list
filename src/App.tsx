import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { todosStore } from './store/todos-store';
import { TodoList } from './components/TodoList/todo-list';
import { CreateTodo } from './components/CreateTodo/create-todo';
import { SortBy } from './types';

import styles from "./App.module.css";

export const App = observer(() => {
  const { todos } = todosStore;

  const [showCompleted, setShowCompleted] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.DATE)

  const filteredTodos = useMemo(() => {
    return todos
      .filter(
        todo => todo.text.toLowerCase()
          .includes(searchString.toLowerCase())
      )

      .filter(todo => showCompleted ? todo.completed : true)

      .sort((a, b) => {
        if (sortBy === SortBy.TEXT) {
          return a.text.localeCompare(b.text)
        } else if (sortBy === SortBy.DATE) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        return 0;
      })
  }, [searchString, showCompleted, sortBy, todos]);

  useEffect(() => {
    todosStore.fetchTodos();
  }, [])

  return (
    <div>

      <CreateTodo onCreate={todosStore.createTodo.bind(todosStore)} />

      <hr />

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Поиск..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
        >
          <option value={SortBy.DATE}>По дате создания</option>
          <option value={SortBy.TEXT}>По тексту</option>
        </select>

        <div className={styles.filter}>
          <input
            id="completed"
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
          <label htmlFor="completed">выполненные</label>
        </div>
      </div>

      <hr />

      <TodoList
        todos={filteredTodos}
        onCompleteChange={todosStore.changeTodoComplete.bind(todosStore)}
        onDelete={todosStore.deleteTodo.bind(todosStore)}
      />
    </div>
  );
})
