const axios = require('axios');

module.exports = class ProxyService {

    /**
     * Proxy an existing request.
     * @param method
     * @param url
     * @param req
     * @param res
     * @param additionalBody
     * @returns {Promise<void>}
     */
    static async proxyRequest(method, url, req, res, additionalBody = {}) {
        try {
            const response = await axios({
                method,
                url,
                data: {...req.body, ...additionalBody},
            });
            res.send(response.data);
        } catch (e) {
            res.status(500);
            res.send(e.message);
        }
    }

    /**
     * Send a request.
     * @param method
     * @param url
     * @param body
     * @param headers
     * @returns {AxiosPromise<any>}
     */
    static async sendRequest(method, url, body = {}, headers = {}) {
        return axios({
            method,
            url,
            data: body,
            headers,
        });
    }

};
