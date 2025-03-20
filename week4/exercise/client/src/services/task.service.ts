import { catchError, of } from "rxjs";
import { fetchResource } from "../helpers/fetch";

const API_URL = "/api";

export class TaskService {
  getTasks = () => fetchResource({ 
    url: `${API_URL}/tasks`, 
    method: "GET",
  }).pipe(
    catchError((error) => {
      console.error("Error fetching tasks:", error);
      return of([]);
    })
  );

  addTask = (name: string) =>
    fetchResource({ 
      url: `${API_URL}/tasks`, 
      method: "POST", 
      body: { name },
    });

  deleteTask = (taskId: number ) =>
    fetchResource({ 
      url: `${API_URL}/tasks/${taskId}`, 
      method: "DELETE", 
    });
}
