import express            from 'express';
import http               from 'http';
import socket             from 'socket.io';
import SocketController   from "./controllers/SocketController";
import ChatRoomController from "./controllers/ChatRoomController";

const app = express();
const httpServer = http.createServer(app);
const io = socket(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/demo/index.html');
});

io.on('connection', async (socket) => {

    socket.on('SET_UID', async uid => {
        await SocketController.setSocketUser(socket, uid);
    });

    socket.on('JOIN_ROOM', async roomId => {
        await ChatRoomController.joinChatRoom(socket, roomId);
    });

    socket.on('SEND_MESSAGE', async (payload: {roomId: string, text: string}) => {
        await ChatRoomController.sendChatMessage(socket, payload);
    });

    socket.on('disconnect', async () => {
        await ChatRoomController.leaveAllChatRooms(socket);
        await SocketController.removeSocketUser(socket);
    });

});

io.listen(httpServer);

httpServer.listen(3000, () => {
    console.log("Service started...");
});

