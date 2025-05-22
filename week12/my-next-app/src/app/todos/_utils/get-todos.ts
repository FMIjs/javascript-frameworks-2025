import { supabase } from "../../supabase";
import { Todo } from "../types";

export const getTodos = async () => {
  const { data: todos } = await supabase.from("todos").select("*");

  await new Promise((res) => setTimeout(res, 5000));

  return todos as Todo[];
};
