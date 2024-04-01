const ProxyService      = require('../services/ProxyService');
const HttpRequestMethod = require('../enums/HttpRequestMethod');

module.exports = class CommunityServiceController {


    /**
     * Get a list of joined communities for a user.
     * REQUIRES authorization.
     * @param req
     * @param res
     * @returns {Promise<*|Namespace|Socket|boolean|void>}
     */
    static async getJoinedCommunities(req, res) {

        if(!req.user) {
            res.boom.unauthorized();
        } else {
            try {
                const result = await ProxyService.sendRequest(
                    HttpRequestMethod.GET,
                    process.env.COMMUNITY_SERVICE_URL + "/rest/fanlinc/users/" + req.user.uid,
                );
                res.send(result.data.joinedCommunities);
            } catch (e) {
                if(e.response && e.response.status === 404) {
                    return res.send([]);
                } else {
                    console.error(e);
                    return res.boom.badImplementation();
                }
            }

        }

    }

    /**
     * Given community ID return all events.
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async getEventsForCommunity(req, res) {
        try {
            const result = await ProxyService.sendRequest(
                HttpRequestMethod.GET,
                process.env.COMMUNITY_SERVICE_URL + "/rest/fanlinc/communities/" + req.params.id + "/getEvents",
            );
            res.send(result.data);
        } catch (e) {
            console.error(e);
            return res.boom.badImplementation();
        }
    }

};
