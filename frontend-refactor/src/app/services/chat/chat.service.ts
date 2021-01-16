import { Injectable } from "@angular/core";
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ChatMessage } from "src/app/models/chat-message.model";
import { RoomUsers } from "src/app/models/room-users.model";

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
                observer.next(data);
            });

            // If there's an error, disconnect socket
            // return () => {
            //     this.socket.disconnect();
            // }
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
}