import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errorSelector } from "recoil";

/* function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setTodoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = event;
    setToDo(value);
    setTodoError("");
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (toDo.length < 10) {
      setTodoError("too short!");
    } else
      console.log("submit")
  }
  return <>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={toDo} placeholder="write to do" />
      <button>Add</button>
      {toDoError !== "" ? toDoError : null}
    </form>
  </>;
} */

function ToDoList() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  return <>
    <form autoComplete="off" style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
      <input {...register("email", {
        required: "Email is Required",
        pattern: {
          value: /^[A-Za-z0-9._%+-]+@naver.com$/,
          message: "Only @naver.com email allowed"
        },
      })} placeholder="Email" />
      <span>{errors?.email?.message}</span>
      <input {...register("first_name", { required: true })} placeholder="First Name" />
      <input {...register("last_name")} placeholder="Last Name" />
      <input {...register("username")} placeholder="username" />
      <input {...register("password")} placeholder="password" />
      <input {...register("password1")} placeholder="password1" />
      <button>Add</button>
    </form>
  </>
}
export default ToDoList;