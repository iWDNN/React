import { useRecoilValue } from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";


function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  return <>
    <h1>To Dos</h1>
    <hr />
    <CreateToDo />
    <ul>
      {toDos ? toDos.map(todo => <ToDo key={todo.id} {...todo} />) : null}
    </ul>
  </>;
}

export default ToDoList;