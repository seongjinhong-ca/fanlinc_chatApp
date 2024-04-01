import IdentityService from "../services/IdentityService";

export default class SignupController {
  static async isEmailAvailable(email: string) {
    return IdentityService.isEmailAvailable(email);
  }

  static async createUser(email: string, password: string, username: string) {
    try {
      await IdentityService.createUser(email, password, username);
    } catch (e) {
      return [false, e];
    }
    return [true, null];
  }
}
