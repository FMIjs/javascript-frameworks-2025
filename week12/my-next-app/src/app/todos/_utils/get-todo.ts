import { supabase } from "../../supabase";
import { Todo } from "../types";

export const getTodo = async (id: string) => {
  const { data: todo } = await supabase
    .from("todos")
    .select("*")
    .filter("id", "eq", id)
    .single();

  return todo as Todo;
};
