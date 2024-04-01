import {Socket}      from "socket.io";
import SocketService from "../services/SocketService";

export default class SocketController {

    static async setSocketUser(socket: Socket, uid: string) {
        await SocketService.setSocketUser(socket, uid);
        console.log(`Socket ${socket.id} mapped as user ${uid}.`);
    }

    static async removeSocketUser(socket) {
        await SocketService.removeSocketUser(socket);
        console.log(`Socket ${socket.id} removed from user mapping.`);
    }

}
