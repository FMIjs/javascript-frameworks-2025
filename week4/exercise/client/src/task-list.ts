import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TaskService } from './services/task.service';
import { filter, Observable, take } from 'rxjs';
import { Subscription } from 'rxjs';
import { Task } from './types/task';

@customElement('task-list')
export class TaskList extends LitElement {
  static styles = css`
    .task-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }

    .task-table th, .task-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    .task-table th {
      background-color: #f2f2f2;
    }

    .task-table tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .toolbar button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .toolbar button:hover {
      background-color: #45a049;
    }
  `;

  @state()
  private tasks!: Observable<Task[]>;

  @state()
  private loadedTasks: Task[] = [];

  @state()
  private showForm = false;

  private taskService: TaskService;
  private subscription?: Subscription;


  constructor() {
    super();
    this.taskService = new TaskService();
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTasks();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadTasks() {
    this.tasks = this.taskService.getTasks();
    this.tasks.pipe(filter(Boolean), take(1)).subscribe(
      tasks => {
        this.loadedTasks = tasks;
        this.requestUpdate();
      }
    );
  }

  private deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  private handleTaskCreated() {
    this.loadTasks();
  }

  private toggleForm() {
    this.showForm = !this.showForm;
  }

  render() {
    return html`
      <h2>Tasks</h2>
      <div class="task-list">
        <div class="toolbar">
          <button @click=${this.toggleForm}>
            ${this.showForm ? 'Cancel' : 'Add New'}
          </button>
        </div>
        ${this.showForm ? html`<task-form @task-created=${this.handleTaskCreated}></task-form>` : nothing}
        <table class="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            ${this.loadedTasks.map(task => html`
              <tr>
                <td>${task.name}</td>
                <td><button @click=${() => this.deleteTask(task.id)}>Delete</button></td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'task-list': TaskList;
  }
}
