import { NextPageProps } from "../../../types";
import { getTodo } from "../_utils/get-todo";
import { getTodos } from "../_utils/get-todos";

type TodoProps = NextPageProps<{ id: string }>;

export async function generateStaticParams() {
  const todos = await getTodos();
  return todos.map((todo) => ({ id: todo.id }));
}

export default async function Todo(props: TodoProps) {
  const { params } = props;
  const { id } = await params;
  const todo = await getTodo(id);
  return <>{todo.title}</>;
}
