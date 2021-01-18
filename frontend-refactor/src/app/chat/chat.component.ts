import { Component, ElementRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatMessage } from '../models/chat-message.model';
import { User } from '../models/user.model';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatWindow') private chatWindow: ElementRef;
  myUsername: string; 
  room: string;
  searchTerm: string;
  users: Array<User> = [];
  messageContent: string;
  messages: Array<ChatMessage> = [];
  refreshSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router){
  }

  ngOnInit(): void {
    this.initializeUsername();
    this.initializeRoom();
    this.listenForMessages();
    this.listenForUsersRoomList();
  }

  ngAfterViewChecked(): void {
    this.scrollChatWindowToBottom();
  }

  public listenForMessages(): void {
    this.chatService.messageReceived().subscribe(message => {
      this.messages.push(message);
    });
  }

  public listenForUsersRoomList(): void {
    this.chatService.usersInRoom().subscribe(data => {
      this.users = data.users;
    });
  }

  public listenForBrowserRefresh(): void {
    this.refreshSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart){
        this.leaveRoom();
      }
    });
  }

  public sendMessage(): void {
    this.chatService.sendMessage(this.messageContent);
    this.messageContent = "";
  }

  public leaveRoom(): void {
    this.chatService.leaveRoom();
  }

  /* Initialization methods */
  private initializeRoom(): void {
    this.room = this.route.snapshot.paramMap.get('id') || "";
    this.chatService.joinRoom(this.room, this.myUsername);
  }

  private initializeUsername(): void {
    this.myUsername = localStorage.getItem(environment.localStorageUsernameKey) || "";

    if(this.myUsername == ""){
      // redirect user to login page
    }
  }

  /* Methods for UI behavior */
  private scrollChatWindowToBottom(): void {
    try {
      this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
    }
    catch(err) { } 
  }
}
