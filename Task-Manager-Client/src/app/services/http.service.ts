import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../tasks/tasks.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) {
  }

  // basicRequest(obj: any): Observable<any> {
  //   // return this.http.get('http://localhost:3000/main');
  //   const params = new HttpParams()
  //     .set('id', "1")
  //     .set('title', 'title')
  //     .set('pointValue', '15')
  //     .set('difficultyLevel', 'difficultyLevel')
  //     .set('dueDate', 'dueDate');
  //   return this.http.post('http://localhost:3000/tasks', { params })
  //   // return this.http.post(`http://localhost:3000/tasks/${obj.id}/${obj.title}/${obj.pointValue}/${obj.difficultyLevel}/${obj.dueDate}`, {})
  // }
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
