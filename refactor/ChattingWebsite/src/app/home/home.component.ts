import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { SharedDataService } from '../services/shared-data/shared-data.service';
import { SignalRService } from '../services/signalr/signalr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms: Array<string> = environment.roomNames;
  room: string = this.rooms[0];
  username: string;

  constructor(private shareDataService: SharedDataService, private signalRService: SignalRService){
  }

  ngOnInit(): void {
  }

  public joinRoom(): void {
    this.shareDataService.username = this.username;

    this.signalRService.joinGroup(this.shareDataService.username, this.room);
  }

}
