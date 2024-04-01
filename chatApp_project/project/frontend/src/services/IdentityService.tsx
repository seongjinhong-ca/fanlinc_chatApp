import axios from "axios";
import { getToken } from "../utilities/getToken";
// TODO http://cscc01.jackzh.com:5000
const IDENTITY_SERVICE_URL = "http://localhost:5000";
const GATEWAY_URL = "http://localhost:9000";

export default class IdentityService {
  /**
   * Check if an email is available for use.
   * @param email
   */
  static async isEmailAvailable(email: string) {
    try {
      const result = await axios.get(
        IDENTITY_SERVICE_URL + "/email/exists/" + email
      );
      return !result.data.userExists;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async getInfo(uid: string) {
    const result = await axios.get(IDENTITY_SERVICE_URL + "/user/info/" + uid);
    return result.data;
  }
  /**
   * Create an user.
   * @param email
   * @param password
   * @param username
   */
  static async createUser(email: string, password: string, username: string) {
    await axios.post(IDENTITY_SERVICE_URL + "/user/create", {
      email,
      password,
      username
    });
  }

  /**
   * Attempt to login and get token.
   * @param email
   * @param password
   */
  static async login(email: string, password: string) {
    try {
      const result = await axios.post(GATEWAY_URL + "/identity/login", {
        email,
        password
      });
      return result.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async getIdentity() {
    try {
      const result = await axios.get(GATEWAY_URL + "/identity", {
        headers: { Authorization: getToken() }
      });
      return result.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static async getName(email: string) {
    try {
      const result = await axios.get(
        `${IDENTITY_SERVICE_URL}/user/get/name/${email}`
      );
      if (result.status === 200) {
        return result.data.name;
      }
      // TODO Show error message saying name not set
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  static async setName(uid: string, name: string) {
    try {
      await axios.post(`${IDENTITY_SERVICE_URL}/user/set/name`, {
        uid,
        name
      });
      return 0;
    } catch (e) {
      return -1;
    }
  }
  static async getUsername(email: string) {
    try {
      const result = await axios.get(
        `${IDENTITY_SERVICE_URL}/user/get/username/${email}`
      );
      if (result.status === 200) {
        return result.data.username;
      }
      // TODO Show error message saying name not set
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  static async setUsername(uid: string, username: string) {
    try {
      await axios.post(`${IDENTITY_SERVICE_URL}/user/set/username`, {
        uid,
        username
      });
      return 0;
    } catch (e) {
      return -1;
    }
  }
  static async getProfilePicture(email: string) {
    try {
      const result = await axios.get(
        `${IDENTITY_SERVICE_URL}/user/get/profile-picture/${email}`
      );
      if (result.status === 200) {
        return result.data;
      }
      // TODO Show error message saying name not set
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async imageUpload(imageFile: File, email: string = "me@jackzh.com") {
    const imageFormData = new FormData();
    imageFormData.append("file", imageFile);
    return (await axios.post(
      IDENTITY_SERVICE_URL + "/user/image/upload/" + email,
      imageFormData
    )).data;
  }

  static async getUserInfo(uid: string) {
    try {
      const result = await axios.get(
        `${IDENTITY_SERVICE_URL}/user/info/${uid}`
      );
      if (result.status === 200) {
        return result.data;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async setPrivateFields(uid: string, fields: any) {
    try {
      await axios.post(`${IDENTITY_SERVICE_URL}/user/set/private`, {
        uid,
        fields
      });
      return 0;
    } catch (e) {
      console.log(e);
      return -1;
    }
  }

  static async setProfilePicture(imageFile: File, uid: String) {
    const imageFormData = new FormData();
    imageFormData.append("file", imageFile);
    return (await axios.post(
      IDENTITY_SERVICE_URL + "/user/add/profile-picture/" + uid,
      imageFormData
    )).data;
  }
}
