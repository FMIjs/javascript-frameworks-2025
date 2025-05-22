"use client";

import { useActionState } from "react";
import { createTodo } from "../../_actions/createTodo";

export function CreateTodoForm() {
  const [state, formAction, isPending] = useActionState(createTodo, {
    message: null,
  });

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="todo">Add new todo:</label>
        <input type="text" id="todo" name="title" />
      </div>
      {isPending ? "Loading..." : state.message}
      <button disabled={isPending}>Save</button>
    </form>
  );
}
