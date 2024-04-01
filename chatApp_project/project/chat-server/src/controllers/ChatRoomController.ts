import {Socket}      from "socket.io";
import ChatRoom      from "../models/ChatRoom";
import SocketService from "../services/SocketService";
import Message       from "../models/Message";

let chatRooms = {};

const getChatRoomById = (id: string): ChatRoom => {
    if(chatRooms[id]) {
        return chatRooms[id];
    } else {
        chatRooms[id] = new ChatRoom();
        chatRooms[id].id = id;
        return chatRooms[id];
    }
};

export default class ChatRoomController {

    static async joinChatRoom(socket: Socket, roomId: string) {

        const chatRoom = getChatRoomById(roomId);
        const user = await SocketService.getSocketUser(socket);
        chatRoom.onlineUsers.push(user);
        console.log(`${user.uid} joined ${roomId}.`);

    }

    static async leaveChatRoom(socket: Socket, roomId: string) {
        const chatRoom = getChatRoomById(roomId);
        const user = await SocketService.getSocketUser(socket);
        if(chatRoom.onlineUsers.indexOf(user) > -1) {
            chatRoom.onlineUsers.splice(chatRoom.onlineUsers.indexOf(user), 1);
        }
        console.log(`${user.uid} left ${roomId}.`);
    }

    static async leaveAllChatRooms(socket: Socket) {
        for(const chatRoomId in chatRooms) {
            await ChatRoomController.leaveChatRoom(socket, chatRoomId);
        }
    }

    static async sendChatMessage(socket: Socket, args: {roomId: string, text: string}) {

        console.log(`Sending ${args.text} to ${args.roomId}.`);

        const chatRoom = getChatRoomById(args.roomId);
        const user = await SocketService.getSocketUser(socket);

        const msg = new Message();
        msg.uid = user.uid;
        msg.text = args.text;
        msg.sentAt = new Date();

        chatRoom.messages.push(msg);

        // Broadcast the message
        for(const user of chatRoom.onlineUsers) {
            const userSocket = await SocketService.getUserSocket(user);
            userSocket.emit('NEW_MESSAGE', {
                chatRoomId: chatRoom.id,
                message: msg,
            });
            console.log(`Broadcast ${msg.text} to ${userSocket.id}`);
        }

    }

}
