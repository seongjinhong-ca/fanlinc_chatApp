const ProxyService      = require('../services/ProxyService');
const HttpRequestMethod = require('../enums/HttpRequestMethod');

module.exports = class ChatManagementServiceController {


    /**
     * Create a new chat (private by default)
     * @param req
     * @param res
     * @returns {Promise<*|Namespace|Socket|boolean|void>}
     */
    static async createChat(req, res) {
        try {
            const result = await ProxyService.sendRequest(
                HttpRequestMethod.PUT,
                process.env.CHAT_MANAGEMENT_SERVICE_URL + "/rest/fanlinc/chatmanagement/chat",
                {
                    userId: req.user.uid,
                    chatName: req.body.name,
                }
            );
            return res.send(result.data);
        } catch (e) {
            console.error(e.response);
            res.boom.badImplementation();
        }
    };

    /**
     * Get all chats within the system.
     * @returns {Promise<any>}
     */
    static async getAllChats(req, res) {
        try {
            const result = await ProxyService.sendRequest(
                HttpRequestMethod.GET,
                process.env.CHAT_MANAGEMENT_SERVICE_URL + "/rest/fanlinc/chatmanagement/all_chats"
            );
            return res.send(result.data);
        } catch (e) {
            res.boom.badImplementation();
        }
    }

    static async getAllChatsForUser(req, res) {
        if (!req.user) {
            return res.boom.unauthorized();
        }
        try {
            const result = await ProxyService.sendRequest(
                HttpRequestMethod.GET,
                process.env.CHAT_MANAGEMENT_SERVICE_URL + "/rest/fanlinc/chatmanagement/all_user_chats",
                {
                    userId: req.user.uid
                }
            );
            return res.send(result.data.chatId);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                return res.send([]);
            } else {
                console.error(e);
                return res.boom.badImplementation();
            }
        }
    }

    /**
     * Gets all chats associated with a community.
     *
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    static async getAllChatsForCommunity(req, res) {
        try {
            const result = await ProxyService.sendRequest(
                HttpRequestMethod.GET,
                process.env.CHAT_MANAGEMENT_SERVICE_URL + "/rest/fanlinc/chatmanagement/chat/community",
                {
                    communityId: req.params.id
                }
            );
            return res.send(result.data);
        } catch (e) {
            res.boom.badImplementation();
        }
    }
};

