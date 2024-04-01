const express                         = require('express')
const dotenv                          = require('dotenv');
const IdentityServiceController       = require('./controllers/IdentityServiceController');
const CommunityServiceController      = require('./controllers/CommunityServiceController');
const ChatManagementServiceController = require('./controllers/ChatManagementServiceController');
const createProcess                   = require('./process/createProcess');
const ProxyService                    = require('./services/ProxyService');
const HttpRequestMethod               = require('./enums/HttpRequestMethod');
const bodyParser                      = require('body-parser');
const cors                            = require('cors');
const boom                            = require('express-boom');
dotenv.config();

const app        = express();
const httpServer = require('http').createServer(app);
const io         = require('socket.io')(httpServer);

const processes = [
    // ['Chat Server', 'scripts/start-chat-server.sh'],
    // ['Identity Service', 'scripts/start-identity-service.sh'],
    // ['Community Service', 'scripts/start-community-service.sh'],
    // ['Chat Management Service', 'scripts/start-chat-management-service.sh'],
];

const logs = {};

function createProcessLog(type, name, content) {
    if (!logs[name]) logs[name] = "";
    logs[name] += content;
    io.emit('log', {type, name, content});
}

app.set('view engine', 'ejs');
app.use(cors());
app.use(boom());
app.use(bodyParser.json());

app.get('/_status', (req, res) => res.render('status', {processes}));

for (const [name, processPath] of processes) {

    console.log(name, processPath);

    createProcess(
        processPath, [],
        (data) => {
            createProcessLog('stdout', name, data.toString());
        },
        (data) => {
            createProcessLog('stderr', name, data.toString());
        },
        () => {
            createProcessLog('term', name, 'terminated');
        }
    )

}

io.on('connection', function (socket) {
    socket.emit('log history', logs);
});

app.use(async (req, res, next) => {
    if (req.header('authorization')) {
        try {
            const response        = await ProxyService.sendRequest(HttpRequestMethod.GET, process.env.IDENTITY_SERVICE_URL + "/user/uid/" + req.header('authorization'));
            const profileResponse = await ProxyService.sendRequest(HttpRequestMethod.GET, process.env.IDENTITY_SERVICE_URL + "/user/identity/" + response.data.uid);
            req.user              = {
                ...profileResponse.data,
                uid: response.data.uid,
            };
        } catch (e) {
            console.log("Failed to verify authorization token.");
        }
    }
    next();
});

app.post("/identity/login", IdentityServiceController.loginAndGetToken);
app.get("/identity", IdentityServiceController.getIdentity);
app.get("/joinedCommunities", CommunityServiceController.getJoinedCommunities);
app.post("/chats", ChatManagementServiceController.createChat);
app.get("/allChats", ChatManagementServiceController.getAllChats);
app.get("/myChats", ChatManagementServiceController.getAllChatsForUser);
app.get("/communities/:id/chats", ChatManagementServiceController.getAllChatsForCommunity);
app.post("/user/image/upload", IdentityServiceController.uploadImage);
app.get("/communities/:id/events", CommunityServiceController.getEventsForCommunity);

httpServer.listen(process.env.PORT, () => console.log(`Gateway is listening on port http://localhost:${process.env.PORT}/_status`));
