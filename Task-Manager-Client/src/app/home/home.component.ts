import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private httpService: HttpService
  ) {

  }
  // makeBasicHttpRequest() {
  //   let obj = {
  //     id: "5",
  //     title: "tamazzzzz",
  //     pointValue: "15",
  //     difficultyLevel: "Hard",
  //     date: "15.5.1231"
  //   }
  //   this.httpService.basicRequest(obj).subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
