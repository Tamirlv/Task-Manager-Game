import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Task } from '../tasks/tasks.component';

@Component({
  selector: 'app-task-game',
  templateUrl: './task-game.component.html',
  styleUrls: ['./task-game.component.css']
})
export class TaskGameComponent implements OnInit {
  tasks: Task[] = [];
  playerScore: number = 0;
  playerLevel: number = 1;
  currentPage = 0; // Current page index
  itemsPerPage = 3; // Items per page
  totalRecords = 0; // Total number of records

  constructor(
    private httpService: HttpService,
  ) { }
  ngOnInit(): void {
    this.httpService.getAllTasks().subscribe((tasks: any) => {
      this.tasks = tasks;
      this.sortTasks();
      this.totalRecords = this.tasks.length;
    })
    this.httpService.getUserData().subscribe((data: any) => {
      this.playerLevel = data.level;
      this.playerScore = data.score;
    });
  }

  onPageChange(event: any): void {
    // Update currentPage on page change (paginator)
    this.currentPage = event.page;
  }

  handleTaskCompleted(userData: any) {
    // Handle the completed task data received from the TaskComponent
    // Update player score and level
    this.playerScore = userData.user.score;
    this.playerLevel = userData.user.level;
    this.httpService.getAllTasks().subscribe((tasks: any) => {
      this.tasks = tasks;
      this.sortTasks()
    })
  }

  sortTasks() {
    // Sorting the completed to the end of the array
    this.tasks.sort((a: Task, b: Task) => {
      if (a.completed) return 1;
      return -1;
    })
  }
}
