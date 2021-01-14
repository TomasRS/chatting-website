import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr'
import * as signalR from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack'
import { ChatMessage } from '../../models/chat-message.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserGroup } from 'src/app/models/user-group.model';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private apiUrl = "https://localhost:7071/api";
  private hubConnection: HubConnection;
  public messages: Array<ChatMessage> = [];

  constructor(private httpClient: HttpClient) { }

  public connect = () => {
    this.startConnection();
    this.addListeners();
  }

  public joinGroup(username: string, groupName: string){
    var uri = `${this.apiUrl}/JoinGroup`;
    return this.httpClient.post(uri, this.buildUserGroup(username, groupName));
  }

  public sendMessage(message: string, username: string, toGroup: string){
    var uri = `${this.apiUrl}/SendToGroup`;
    return this.httpClient.post(uri, this.buildChatMessage(message, username, toGroup));
  }

  /**
   * Gets the SignalR connection
   */
  private getConnection(): HubConnection{
    return new signalR.HubConnectionBuilder()
      .withUrl(this.apiUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      .build();
  }

  /**
   * Starts the SignalR connection
   */
  private startConnection(): void {
    this.hubConnection = this.getConnection();
    this.hubConnection.start()
    .then(() => console.log("connection started"))
    .catch((err) => console.log("error while establishing signalr connection: " + err));
  }

  /**
   * Adds listeners to the Hub connection
   */
  private addListeners(): void {
    this.hubConnection.on(environment.messageEventName, (data: ChatMessage) => {
      console.log("message received from API");
      this.messages.push(data);
    });
  }

  /**
   * Methods for building chat message and user-group join/leave
  */

  private buildChatMessage(message: string, username: string, toGroup: string): ChatMessage {
    let user = new User("", username, false);
    return {
      Content: message,
      User: user,
      ToGroupName: toGroup,
      Time: new Date().toLocaleTimeString()
    }
  }

  private buildUserGroup(username: string, groupName: string) : UserGroup{
    let user = new User("", username, false);
    return {
      User: user,
      GroupName: groupName
    };
  }
}