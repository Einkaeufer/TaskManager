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
      const newTask = {
        name: this.newTaskName,
        description: this.newTaskDescription,
        dueDate: this.newTaskDueDate,
        tag: this.newTaskTag || this.customTag,
        completed: false
      };

      if (this.editingIndex !== null) {
        this.tasks[this.editingIndex] = newTask;
        this.editingIndex = null; // Reset the editing index
      } else {
        this.tasks.push(newTask);
      }

      this.newTaskName = '';
      this.newTaskDescription = '';
      this.newTaskDueDate = '';
      this.newTaskTag = '';
      this.customTag = '';
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

  predefinedTags = [
    {name: 'Arbeit', color: '#FF5733'},
    {name: 'Einkauf', color: '#33FF57'},
    {name: 'Freizeit', color: '#5733FF'},
    {name: 'Familie', color: '#FF33A1'},
    {name: 'Hausarbeiten', color: '#33A1FF'}
  ];

  customTag: string = '';
  showCustomTagInput: boolean = false;

  onTagChange(event: any) {
    if (event.target.value === 'custom') {
      this.showCustomTagInput = true;
    } else {
      this.showCustomTagInput = false;
      this.customTag = '';
    }
  }

  newTaskTag: string = '';

  getTagColor(tag: string): string {
    const predefinedTag = this.predefinedTags.find(t => t.name === tag);
    if (predefinedTag) {
      return predefinedTag.color;
    } else if (tag) {
      return '#FFD700'; // Gold color for custom tags
    }
    return '#D3D3D3'; // Light gray for no tag
  }
}
