import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms: Array<string> = environment.roomNames;
  room: string = this.rooms[0];
  username: string;

  constructor(){}

  ngOnInit(): void {
  }

  public setUsername(): void {
    localStorage.setItem(environment.localStorageUsernameKey, this.username);
  }

}
