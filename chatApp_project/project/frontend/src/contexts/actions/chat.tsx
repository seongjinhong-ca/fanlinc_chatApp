import ChatManagementService from "../../services/ChatManagementService";

export const fetchAllChats = async (
  updateState: Function,
  state: any,
  args: any
) => {
  try {
    const allChats = await ChatManagementService.getAllChats();
    updateState({ chats: allChats });
  } catch (error) {
    console.error(error);
  }
};

export const fetchJoinedChatIds = async (
  updateState: Function,
  state: any,
  args: any
) => {
  try {
    const chats = await ChatManagementService.getJoinedChats();
    updateState({ joinedChatIds: chats });
  } catch (e) {
    console.error(e);
  }
};
