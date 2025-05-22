import { Suspense } from "react";
import { CreateTodoForm } from "./_components/CreateTodoForm/CreateTodoForm";
import { TodoList } from "./_components/TodoList/TodoList";

export default async function Todos() {
  return (
    <>
      <CreateTodoForm />
      <Suspense fallback={<TodoList isLoading={true} />}>
        <TodoList />
      </Suspense>
    </>
  );
}
