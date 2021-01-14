import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatMessage } from '../models/chat-message.model';
import { SharedDataService } from '../services/shared-data/shared-data.service';
import { SignalRService } from '../services/signalr/signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  myUsername: string; 
  room: string;
  users: Array<string>;
  messageContent: string;
  messages: Array<ChatMessage>;

  constructor(
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    public signalRService: SignalRService,
    ) {
  }

  ngOnInit(): void {
    this.initializeRoom();
    this.initializeUsername();
    this.signalRService.connect();
  }

  public sendMessage(): void {
    this.signalRService.sendMessage(this.messageContent, this.myUsername, this.room).subscribe({
      next: _ => this.messageContent = "",
      error: (err) => console.error(err)
    });
  }

  /* Initialization methods */
  private initializeRoom(): void {
    this.room = this.route.snapshot.paramMap.get('id') || "";
  }

  private initializeUsername(): void {
    this.myUsername = this.sharedDataService.username;
  }
}
