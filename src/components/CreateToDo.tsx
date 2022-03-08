import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IToDo, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos(oldToDos => [{ text: toDo, id: Date.now(), category }, ...oldToDos]);
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