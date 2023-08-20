import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../tasks/tasks.component';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  @Output() taskCompleted: EventEmitter<Task> = new EventEmitter<Task>();
  constructor(
    private httpService: HttpService
  ) {

  }

  ngOnInit(): void {
  }

  completeTask() {
    this.httpService.completeTask(this.task.id).subscribe((userData: any) => {
      this.taskCompleted.emit(userData);
    })
  }
}

