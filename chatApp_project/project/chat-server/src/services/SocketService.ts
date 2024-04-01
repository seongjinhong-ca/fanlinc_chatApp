import {Socket} from "socket.io";
import User     from "../models/User";

let sockets = {};

export default class SocketService {

    static async setSocketUser(socket: Socket, uid: string) {
        const user = new User();
        user.uid = uid;
        sockets[socket.id] = {
            socket,
            user,
        };
    }

    static async removeSocketUser(socket: Socket) {
        delete sockets[socket.id];
    };

    static async getSocketUser(socket: Socket): Promise<User | null> {
        if (sockets[socket.id]) {
            return sockets[socket.id].user;
        } else {
            return null;
        }
    }

    static async getUserSocket(user: User): Promise<Socket | null> {
        for(const socketId in sockets) {
            if(user.uid === sockets[socketId].user.uid) {
                return sockets[socketId].socket;
            }
        }
    }

}
