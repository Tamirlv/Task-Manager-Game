import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task-Manager-Game';
  items: MenuItem[] = [];
  constructor(
    private router: Router
  ) {
    this.items = [
      {
        label: 'Task Game',
        command: () => this.router.navigate(['/home'])
      },
      {
        label: 'Tasks',
        command: () => this.router.navigate(['/tasks'])
      }
    ];
  }
  ngOnInit(): void {
  }
}
