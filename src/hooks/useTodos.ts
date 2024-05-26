import {atom, useAtom} from 'jotai';
import { produce } from 'immer';

import ITodo from '../interfaces/ITodo';

const todosAtom = atom<ITodo[]>([]);

export default function useTodos() {
  const [todos, setTodos] = useAtom(todosAtom);
  
  /* without immer 
  const addTodo = (todo: ITodo) => {
    setTodos((items) => [...items, todo]);
  };

  const updateTodo = (name: string, data: Record<string, any>) => {
    const foundIndex = todos.findIndex((t) => t.name === name);
    const updatedTodo = {
      ...todos[foundIndex],
      ...data,
    };
    // create a new array so that array reference is changed
    // and setTodos causes a rerender
    const newTodos = [
      ...todos.slice(0, foundIndex), // take elements from start upto foundIndex, excluding foundIndex
      updatedTodo, // place new todo at foundIndex
      ...todos.slice(foundIndex + 1), // take rest of the elements from (foundIndex + 1) index
    ];
    setTodos(newTodos);
  }
   */

  // with immer
  const addTodo = (todo: ITodo) => {
    const newTodos = produce(todos, (draft) => {
      draft.push(todo);
    });
    setTodos(newTodos);
  }

  const updateTodo = (name: string, data: Record<string, any>) => {
    const foundIndex = todos.findIndex((t) => t.name === name);
    const newTodos = produce(todos, (draft) => {
      draft[foundIndex] = {
        ...draft[foundIndex],
        ...data
      }
    });
    setTodos(newTodos);
  };

  const finishTodo = (name: string) => {
    const foundIndex = todos.findIndex((t) => t.name === name);
    const newTodos = produce(todos, (draft) => {
      draft[foundIndex].isFinished = true;
    });
    setTodos(newTodos);
  }

  return { todos, addTodo, updateTodo, finishTodo };
}
