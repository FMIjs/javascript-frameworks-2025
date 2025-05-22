"use server";

import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { addTodo } from "../_utils/add-todo";

type CreateTodoState = { message: string | null };

export const createTodo = async (
  prevState: CreateTodoState,
  data: FormData
): Promise<CreateTodoState> => {
  const title = data.get("title");
  if (!title || typeof title !== "string")
    return { message: "Title is required!" };

  console.log(prevState, title);
  await addTodo({ title, completed: false });

  revalidatePath("/todos");
  // redirect("/todos");
  return { message: "Success" };
};
