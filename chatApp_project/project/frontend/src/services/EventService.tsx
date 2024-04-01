import axios from "axios";

const EVENT_SERVICE_URL = "http://localhost:8081/rest/fanlinc/events";
const GATEWAY_URL = "http://localhost:9000";

export default class EventService {
  static async getEvent(id: string | undefined) {
    return await axios.get(EVENT_SERVICE_URL + "/" + id);
  }

  /**
   * Given a list of communities fetch all events.
   * @param communities
   */
  static async getAllEvents(communities: any[]) {
    let events: any[] = [];
    for (const community of communities) {
      const response = await axios.get(
        GATEWAY_URL + "/communities/" + community.id + "/events"
      );
      for (const event of response.data) {
        event.community = community;
      }
      events = events.concat(response.data);
    }
    return events;
  }
}
