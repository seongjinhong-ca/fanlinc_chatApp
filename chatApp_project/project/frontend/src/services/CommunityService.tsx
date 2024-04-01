import axios from "axios";
import { getToken } from "../utilities/getToken";

const COMMUNITY_SERVICE_URL = "http://localhost:8081/rest/fanlinc/communities";
const GATEWAY_URL = "http://localhost:9000";

export default class CommunityService {
  static async getAllCommunities() {
    return (await axios.get(COMMUNITY_SERVICE_URL)).data;
  }

  static async getCommunity(id: string | undefined) {
    return await axios.get(COMMUNITY_SERVICE_URL + "/" + id);
  }

  static async removeCommunity(id: string) {
    return await axios.delete(COMMUNITY_SERVICE_URL + "/" + id);
  }

  // TODO: Connect this with a getAllEvents call
  static async getAllEvents() {
    return null;
  }

  static async getJoinedCommunities() {
    return (await axios.get(GATEWAY_URL + "/joinedCommunities", {
      headers: {
        Authorization: getToken()
      }
    })).data;
  }
}
