import { User } from './user.model';

export class ChatMessage{
    User: User;
    ToGroupName: string;
    Content: string;
    Time: string;
  }