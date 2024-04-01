import Message from "./Message";
import User    from "./User";

export default class ChatRoom {

    public id: string;

    public messages: Message[] = [];

    public onlineUsers: User[] = [];

}
