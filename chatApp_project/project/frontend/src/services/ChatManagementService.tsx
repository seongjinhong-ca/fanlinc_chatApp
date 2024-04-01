import axios from "axios";
import { getToken } from "../utilities/getToken";

const CHAT_MANAGEMENT_SERVICE_URL =
  "http://localhost:8080/rest/fanlinc/chatmanagement";
const GATEWAY_URL = "http://localhost:9000";

export default class ChatManagementService {
  /**
   * Get all chats within the system
   */
  static async getAllChats() {
    // return (await axios.get(GATEWAY_URL + "/allChats")).data;
  }

  /**
   * Get a list of chats joined by current logged in user.
   */
  static async getJoinedChats() {
    // return (await axios.get(GATEWAY_URL + "/myChats", {
    //   headers: { Authorization: getToken() }
    // })).data;
  }

  static async createChat(chatName: string) {
    return await axios.post(
      GATEWAY_URL + "/chats",
      {
        name: chatName
      },
      { headers: { Authorization: getToken() } }
    );
  }

  /**
   * Create a new chat room with name and user ID
   * @param chatName
   * @param userId
   */
  static async createChatRoom(chatName: string, userId: string) {
    return await axios.put(CHAT_MANAGEMENT_SERVICE_URL + "/chat", {
      chatName,
      userId
    });
  }
}
