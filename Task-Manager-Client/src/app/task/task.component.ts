import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../tasks/tasks.component';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task; // The recived task from the task-game component 
  @Output() taskCompleted: EventEmitter<Task> = new EventEmitter<Task>(); // the user data send back to the task-manager component
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void { }

  completeTask() {
    // Completing task, getting and sending the new user score and level
    this.httpService.completeTask(this.task.id).subscribe((userData: any) => {
      this.taskCompleted.emit(userData);
    })
  }
}

