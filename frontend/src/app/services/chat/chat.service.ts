import { Injectable } from "@angular/core";
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ChatMessage } from "src/app/models/chat-message.model";
import { RoomUsers } from "src/app/models/room-users.model";
import * as moment from "moment";

@Injectable()

export class ChatService{

    private socket = io(environment.serverUrl);


    public joinRoom(room: string, username: string): void {
        this.socket.emit(environment.joinRoomEventName, {username, room});
    }

    public leaveRoom(): void {
        this.socket.emit(environment.disconnectEventName);
    }

    public sendMessage(text: string): void {
        this.socket.emit(environment.chatMessageEventName, text);
    }

    public messageReceived(): Observable<ChatMessage> {
        let observable = new Observable<ChatMessage>(observer => {
            this.socket.on(environment.messageEventName, (data: ChatMessage) => {
                data = this.convertToLocalTime(data);
                observer.next(data);
            });
        });

        return observable;
    }

    public usersInRoom(): Observable<RoomUsers> {
        let observable = new Observable<RoomUsers>(observer => {
            this.socket.on(environment.roomUsersEventName, (data: RoomUsers) => {
                observer.next(data);
            });
        })

        return observable;
    }

    private convertToLocalTime(message: ChatMessage): ChatMessage {
        let utc = moment.utc(message.dateTime);
        message.dateTime = moment(utc).local().format(environment.timeFormat);
        return message;
    }
}