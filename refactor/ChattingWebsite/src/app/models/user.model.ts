export class User{
    ConnectionId: string;
    Name: string;
    IsChatBot: boolean;

    constructor(connectionId: string, username: string, isChatBot: boolean) {
        this.ConnectionId = connectionId;
        this.Name = username;
        this.IsChatBot = isChatBot;
    }
}