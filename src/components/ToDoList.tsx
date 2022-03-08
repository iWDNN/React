import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import React from 'react';
import ToDo from "./ToDo";


function ToDoList() {
  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    const { currentTarget: { value } } = e;
    setCategory(value as any);
  }
  return <>
    <h1>To Dos</h1>
    <hr />
    <select value={category} onInput={onInput}>
      <option value={Categories.TO_DO}>TO DO</option>
      <option value={Categories.DOING}>DOING</option>
      <option value={Categories.DONE}>DONE</option>
    </select>
    <CreateToDo />
    <hr />
    <h2>{category}</h2>
    <ul>
      {todos.map(todo => <ToDo key={todo.id} {...todo} />)}
    </ul>
  </>;
}

export default ToDoList;