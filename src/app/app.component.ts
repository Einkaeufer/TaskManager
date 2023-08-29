import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: any[] = [];
  showModal: boolean = false;
  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskDueDate: string = '';  // Fälligkeitsdatum für den Task
  editingIndex: number | null = null; // null bedeutet, dass kein Task bearbeitet wird
  title = 'TaskManager';

  addNewTask() {
    if (this.newTaskName.trim()) {
      if (this.editingIndex !== null) {
        this.tasks[this.editingIndex].name = this.newTaskName;
        this.tasks[this.editingIndex].description = this.newTaskDescription;
        this.tasks[this.editingIndex].dueDate = this.newTaskDueDate;
        this.editingIndex = null; // Reset the editing index
      } else {
        this.tasks.push({name: this.newTaskName, description: this.newTaskDescription, dueDate: this.newTaskDueDate});
      }
      this.newTaskName = '';
      this.newTaskDescription = '';
      this.newTaskDueDate = '';
      this.showModal = false;
    }
  }


  deleteTask(task: any) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.showModal = false;  // Close the modal
      this.newTaskName = '';
      this.newTaskDescription = '';
      this.editingIndex = null;
    }
  }

  closeModal() {
    this.showModal = false;
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskDueDate = '';
    this.editingIndex = null;
  }

  editTask(index: number) {
    this.newTaskName = this.tasks[index].name;
    this.newTaskDescription = this.tasks[index].description;
    this.showModal = true;
    this.editingIndex = index; // Speichern Sie den Index des zu bearbeitenden Tasks
  }
  toggleTaskStatus(task: any) {
    task.completed = !task.completed;
  }

  isTaskOverdue(task: any): boolean {
    const currentDate = new Date();
    const taskDueDate = new Date(task.dueDate);
    return currentDate > taskDueDate && !task.completed;
  }


}
