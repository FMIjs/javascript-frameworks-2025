import { supabase } from "../../supabase";
import { Todo } from "../types";

export const addTodo = async (ticket: Omit<Todo, "id">): Promise<Todo> => {
  const { data } = await supabase
    .from("todos")
    .insert(ticket)
    .select()
    .single();

  return data;
};
