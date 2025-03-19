import { fetchResource } from "../helpers/fetch";

export class TaskService {
  getTasks = () => fetchResource({ url: `/api/tasks`, method: "GET" });

  addTask = (body: { task: string }) =>
    fetchResource({ url: `/api/tasks/add`, method: "POST", body });

  deleteTask = (body: { task: string }) =>
    fetchResource({ url: `/api/tasks`, method: "DELETE", body });
}
