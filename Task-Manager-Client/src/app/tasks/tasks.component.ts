import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Task {
  id: number;
  title: string;
  difficultyLevel: string;
  pointValue: number;
  dueDate: Date;
  completed: boolean;

}
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any = []; // Tasks array
  visible: boolean = false; // New / Edit task dialog visible
  newTaskForm: FormGroup; // Form of new task
  editting: boolean = false // true if in editting mode
  taskEditId: number = 0; // Current id of the task i edit
  today: Date = new Date(); // Date of today (for date input in form)
  difficultyLevels = ['Easy', 'Moderate', 'Hard'];

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    // Creating the form
    this.newTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      difficultyLevel: ['', [Validators.required]],
      pointValue: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    // Getting all tasks from server
    this.getAllTasks();
  }

  getAllTasks() {
    // Getting all tasks from server and setting the tasks array
    this.httpService.getAllTasks().subscribe((data: any) => {
      if (data) {
        this.tasks = data;
      }
    });
  }


  deleteTask(taskId: number) {
    // Deletes a task by the taskId
    this.httpService.deleteTask(taskId).subscribe((data: any) => {
      if (data) {
        this.getAllTasks();
      }
    })
  }

  // When adding a new task (to open the form)
  newTask() {
    this.visible = true;
  }

  editTask(task: Task) {
    // Edit task
    this.editting = true;
    this.taskEditId = task.id;

    // sets the value of the form as the task editting 
    this.newTaskForm.patchValue({
      title: task.title,
      difficultyLevel: task.difficultyLevel,
      pointValue: task.pointValue,
      dueDate: task.dueDate
    })

    this.visible = true; // displays the edit/create task
  }

  onSubmit() {
    // get data from the form
    const formData = this.newTaskForm.value;

    // create task object
    const task: any = {
      title: formData.title,
      difficultyLevel: formData.difficultyLevel,
      pointValue: formData.pointValue,
      dueDate: formData.dueDate
    }
    // checks if we are in create or edit mode
    if (!this.editting) {
      this.httpService.addTask(task).subscribe((data: any) => {
        if (data) {
          this.visible = false;
          this.getAllTasks();
          this.newTaskForm.reset();
        }
      })
    } else {
      this.editting = false;
      task.id = this.taskEditId;
      this.httpService.editTask(task).subscribe((data: any) => {
        if (data) {
          this.visible = false;
          this.getAllTasks();
          this.newTaskForm.reset();
        }
      })
    }
  }

  onCancel() {
    this.visible = false;
    this.editting = false;
    this.newTaskForm.reset();
  }
}
