import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: []
})

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    console.log("add to do", toDo)
    setValue("toDo", "");
    setToDos(oldToDos => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos]);
  }
  console.log(toDos);
  return <>
    <h1>To Dos</h1>
    <hr />
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo",
          { required: "Please write a todo" })}
        placeholder="write to do" />
      <button>Add</button>
    </form>
    <ul>
      {toDos ? toDos.map(todo => (<li key={todo.id}>{todo.text}</li>)) : null}
    </ul>
  </>;
}

export default ToDoList;