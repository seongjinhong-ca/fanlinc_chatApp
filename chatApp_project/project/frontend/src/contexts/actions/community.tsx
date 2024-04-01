import CommunityService from "../../services/CommunityService";

export const fetchAllCommunities = async (
  updateState: Function,
  state: any,
  args: any
) => {
  try {
    const allComms = await CommunityService.getAllCommunities();
    updateState({ communities: allComms });
  } catch (error) {
    console.error(error);
  }
};

export const fetchJoinedCommunities = async (
  updateState: Function,
  state: any,
  args: any
) => {
  try {
    const joinedCommunities = await CommunityService.getJoinedCommunities();
    updateState({ joinedCommunities: joinedCommunities });
  } catch (error) {
    console.error(error);
  }
};
