import {atom, useAtom} from 'jotai';
import { produce } from 'immer';

import ITodo, { ISubTask } from '../interfaces/ITodo';

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
  const addTodo = (todo: Omit<ITodo, "id" | "isFinished" | "subTasks">) => {
    const newTodos = produce(todos, (draft) => {
      const id = Number(new Date()).toString();
      draft.push({
        ...todo,
        id,
        isFinished: false,
        subTasks: []
      });
    });
    setTodos(newTodos);
  }

  const updateTodo = (id: string, data: Omit<ITodo, "id" | "isFinished" | "subTasks">) => {
    const foundIndex = todos.findIndex((t) => t.id === id);
    if (foundIndex < 0) return;
    const newTodos = produce(todos, (draft) => {
      draft[foundIndex] = {
        ...draft[foundIndex],
        ...data
      }
    });
    setTodos(newTodos);
  };

  const finishTodo = (id: string) => {
    const foundIndex = todos.findIndex((t) => t.id === id);
    if (foundIndex < 0) return;
    const newTodos = produce(todos, (draft) => {
      draft[foundIndex].isFinished = true;
    });
    setTodos(newTodos);
  }
  
  const deleteTodo = (id: string) => {
    const foundIndex = todos.findIndex((t) => t.id === id);
    if (foundIndex < 0) return;
    const newTodos = produce(todos, (draft) => {
      draft.splice(foundIndex, 1);
    });
    setTodos(newTodos);
  }
  
  const addSubTask = (todoId: string, subTask: Omit<ISubTask, "id" | "isFinished">) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) return;
    const newTodos = produce(todos, (draft) => {
      const id = Number(new Date()).toString();
      draft[todoIndex].subTasks.push({
        ...subTask,
        id,
        isFinished: false,
      });
    });
    setTodos(newTodos);
  }

  const updateSubTask = (todoId: string, subTaskId: string, subTask: Omit<ISubTask, "id" | "isFinished">) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) return;
    const subTaskIndex = todos[todoIndex].subTasks.findIndex((st) => st.id === subTaskId);
    if (subTaskIndex < 0) return;
    const newTodos = produce(todos, (draft) => {
      draft[todoIndex].subTasks[subTaskIndex] = {
        ...draft[todoIndex].subTasks[subTaskIndex],
        ...subTask,
      }
    });
    setTodos(newTodos);
  }
  
  const finishSubTask = (todoId: string, subTaskId: string) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) return;
    const subTaskIndex = todos[todoIndex].subTasks.findIndex((st) => st.id === subTaskId);
    if (subTaskIndex < 0) return;
    const newTodos = produce(todos, (draft) => {
      draft[todoIndex].subTasks[subTaskIndex].isFinished = true;
    });
    setTodos(newTodos);
  }

  const deleteSubTask = (todoId: string, subTaskId: string) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) return;
    const subTaskIndex = todos[todoIndex].subTasks.findIndex((st) => st.id === subTaskId);
    if (subTaskIndex < 0) return;
    const newTodos = produce(todos, (draft) => {
      draft[todoIndex].subTasks.splice(subTaskIndex, 1);
    });
    setTodos(newTodos);
  }

  return {
    todos,
    addTodo,
    updateTodo,
    finishTodo,
    deleteTodo,
    addSubTask,
    updateSubTask,
    finishSubTask,
    deleteSubTask
  };
}
