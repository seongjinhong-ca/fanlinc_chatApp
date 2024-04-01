import axios from "axios";
import moment from "moment";

const USER_PROFILE_SERVICE_URL = "http://localhost:8081/rest/fanlinc/users";
const DATE_FORMAT = "DD-MM-YYYY HH:mm";

export default class UserProfileService {
  static async hostEvent(
    communityId: string | undefined,
    uid: string,
    name: string,
    location: string,
    description: string,
    startDateDate: Date,
    endDateDate: Date,
    themeImageLink: string | undefined
  ) {
    const startDate = moment(startDateDate).format(DATE_FORMAT);
    const endDate = moment(endDateDate).format(DATE_FORMAT);
    await axios.post(USER_PROFILE_SERVICE_URL + "/" + uid + "/hostEvent", {
      communityId,
      name,
      location,
      description,
      startDate,
      endDate,
      themeImageLink
    });
  }

  static async editEvent(
    eventId: string | undefined,
    uid: string,
    name: string,
    location: string,
    description: string,
    startDateDate: Date,
    endDateDate: Date,
    themeImageLink: string | undefined
  ) {
    const startDate = moment(startDateDate).format(DATE_FORMAT);
    const endDate = moment(endDateDate).format(DATE_FORMAT);
    await axios.put(USER_PROFILE_SERVICE_URL + "/" + uid + "/editEvent", {
      eventId,
      name,
      location,
      description,
      startDate,
      endDate,
      themeImageLink
    });
  }

  static async deleteEvent(eventId: string | undefined, uid: string) {
    await axios.delete(USER_PROFILE_SERVICE_URL + "/" + uid + "/deleteEvent", {
      data: {
        eventId
      }
    });
  }

  static async joinedCommunity(uid: string, communityId: string | undefined) {
    return await axios.get(
      USER_PROFILE_SERVICE_URL + "/" + uid + "/joinedCommunity/" + communityId
    );
  }

  static async joinCommunity(
    uid: string,
    communityId: string | undefined,
    proficiencyLevel: string
  ) {
    await axios.put(USER_PROFILE_SERVICE_URL + "/" + uid + "/joinCommunity", {
      communityId,
      proficiencyLevel
    });
  }

  static async leaveCommunity(uid: string, communityId: string | undefined) {
    await axios.put(USER_PROFILE_SERVICE_URL + "/" + uid + "/leaveCommunity", {
      communityId
    });
  }

  static async attendEvent(uid: string, eventId: string | undefined) {
    await axios.put(USER_PROFILE_SERVICE_URL + "/" + uid + "/attendEvent", {
      eventId
    });
  }

  static async unattendEvent(uid: string, eventId: string | undefined) {
    await axios.put(USER_PROFILE_SERVICE_URL + "/" + uid + "/unattendEvent", {
      eventId
    });
  }

  static async addEventPost(
    uid: string,
    eventId: string,
    imageLink: string,
    description: string
  ) {
    await axios.post(USER_PROFILE_SERVICE_URL + "/" + uid + "/addEventPost", {
      eventId,
      imageLink,
      description
    });
  }

  static async isPostPoster(uid: string, postId: string) {
    return await axios.get(
      USER_PROFILE_SERVICE_URL + "/" + uid + "/postedPost/" + postId
    );
  }

  static async editPost(uid: string, postId: string, description: string) {
    await axios.put(USER_PROFILE_SERVICE_URL + "/" + uid + "/editPost", {
      postId,
      description
    });
  }

  static async deletePost(uid: string, postId: string) {
    await axios.delete(USER_PROFILE_SERVICE_URL + "/" + uid + "/deletePost", {
      data: {
        postId
      }
    });
  }
}
