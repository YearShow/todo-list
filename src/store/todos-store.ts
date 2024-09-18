import { makeAutoObservable } from 'mobx';
import { v4 } from "uuid";
import { Todo } from '../types';

const BASE_URL = 'http://localhost:3004/todos/';

class TodosStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchTodos() {
    try {
      const response = await fetch(BASE_URL);
      this.todos = await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async createTodo(text: string) {
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: v4(),
          text,
          completed: false,
          createdAt: new Date()
        })
      })

      await this.fetchTodos();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteTodo(id: string) {
    try {
      const url = BASE_URL + id;

      await fetch(url, {
        method: "DELETE"
      })

      await this.fetchTodos();
    } catch (err) {
      console.log(err);
    }
  }

  async changeTodoComplete(id: string, completed: boolean) {
    try {
      const url = BASE_URL + id;

      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          completed
        })
      })

      await this.fetchTodos();
    } catch (err) {
      console.log(err);
    }
  }
}

export const todosStore = new TodosStore();
