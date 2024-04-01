const ProxyService = require('../services/ProxyService');
const HttpRequestMethod = require('../enums/HttpRequestMethod');

module.exports = class IdentityServiceController {
  /**
   * Proxy to login endpoint.
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async loginAndGetToken(req, res) {
    return ProxyService.proxyRequest(
      HttpRequestMethod.POST,
      process.env.IDENTITY_SERVICE_URL + '/user/sign-in',
      req,
      res
    );
  }

  /**
   * Get identity of current user.
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async getIdentity(req, res) {
    if (!req.user) {
      res.status(401);
      res.send({ message: 'Identity cannot be verified.' });
    } else {
      res.send(req.user);
    }
  }
  /**
   * Image Upload
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  static async uploadImage(req, res) {
    console.log(req);
      // const result =  await ProxyService.sendRequest(
      //     HttpRequestMethod.POST,
      //     process.env.IDENTITY_SERVICE_URL + '/user/image/upload/' + req.user.email, req.body
      // );
      // return res.send(result.data);

  }
};
