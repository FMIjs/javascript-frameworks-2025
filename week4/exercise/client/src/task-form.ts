import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TaskService } from './services/task.service';

@customElement('task-form')
export class TaskForm extends LitElement {
  static styles = css`
    .task-form {
      margin: 20px 0;
    }
    
    input {
      padding: 8px;
      margin-right: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }
  `;

  private taskService = new TaskService();

  private async handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;

    if (name.trim()) {
      this.taskService.addTask(name).subscribe(() => {
        form.reset();
        this.dispatchEvent(new CustomEvent('task-created'));
        this.dispatchEvent(new CustomEvent('task-created', { detail: { close: true }}));
      }); 
    }
  }

  render() {
    return html`
      <form class="task-form" @submit=${this.handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Enter task name" 
          required
        >
        <button type="submit">Add Task</button>
      </form>
    `;
  }
}
