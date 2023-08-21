import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../tasks/tasks.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllTasks() {
    return this.http.get('http://localhost:3000/tasks');
  }
  deleteTask(id: number) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`)
  }
  addTask(task: Task) {
    return this.http.post(`http://localhost:3000/tasks/`, task)
  }
  editTask(task: any) {
    return this.http.put(`http://localhost:3000/tasks/`, task)
  }
  completeTask(taskId: any) {
    return this.http.post(`http://localhost:3000/tasks/complete/${taskId}`, {})
  }
  getUserData() {
    return this.http.get('http://localhost:3000/user');
  }
}
