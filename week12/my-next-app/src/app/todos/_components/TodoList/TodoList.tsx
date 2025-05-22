import { getTodos } from "../../_utils/get-todos";

export type TodoListProps = { isLoading?: boolean };

export async function TodoList(props: TodoListProps) {
  const { isLoading } = props;

  if (isLoading)
    return (
      <ul>
        <li>Loading...</li>
        <li>Loading...</li>
        <li>Loading...</li>
      </ul>
    );

  const todos = await getTodos();
  const hasTodos = !!todos.length;

  return hasTodos ? (
    <>
      <h1>TODOS:</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  ) : (
    <h3>No todos yet!</h3>
  );
}
