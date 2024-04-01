export const getCommunityById = (communityList: any[], id: number) => {
  if (communityList.length > 0) {
    for (const community of communityList) {
      if (community.id === id) {
        return community;
      }
    }
  }
  return null;
};
