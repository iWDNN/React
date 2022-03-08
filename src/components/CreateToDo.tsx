import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState)
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    console.log("add to do", toDo)
    setValue("toDo", "");
    setToDos(oldToDos => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos]);
  }
  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo",
          { required: "Please write a todo" })}
        placeholder="write to do" />
      <button>Add</button>
    </form>
  )
}
export default CreateToDo;