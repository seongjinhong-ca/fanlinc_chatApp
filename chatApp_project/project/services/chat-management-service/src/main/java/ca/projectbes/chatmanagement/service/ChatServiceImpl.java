package ca.projectbes.chatmanagement.service;

import ca.projectbes.chatmanagement.datatransfer.*;
import ca.projectbes.chatmanagement.exception.InvalidRequestBodyException;
import ca.projectbes.chatmanagement.exception.NotFoundChatException;
import ca.projectbes.chatmanagement.exception.NotFoundRoleException;
import ca.projectbes.chatmanagement.exception.NotFoundUserException;
import ca.projectbes.chatmanagement.model.*;
import ca.projectbes.chatmanagement.repository.ChatManagementDAO;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

/**
 * Implementation of the ChatService interface.
 *
 * @author Donnie Siu
 */
@Service
public class ChatServiceImpl implements ChatService {
    private ChatManagementDAO dao;

    public ChatServiceImpl() {
        this.dao = ChatManagementDAO.getDAO();
    }

    /**
     * Creates a new private chat containing the creator user as a moderator.
     *
     * @param createChatForm The input structure.
     * @return A chat object containing the chat details.
     */
    @Override
    public ChatModel createChat(CreateChatForm createChatForm) {
        // Validate the user input.
        String userId = createChatForm.getUserId();
        String chatName = createChatForm.getChatName();
        if (userId == null || chatName == null) {
            throw new InvalidRequestBodyException();
        }

        // Create the chat.
        String chatId = UUID.randomUUID().toString();
        ChatModel chatModel = new ChatModel().setChatId(chatId).setName(chatName).setVisibility("private");

        // Get the roleId for moderator.
        ArrayList<Object> role = dao.searchCollection("Role", new ChatRoleModel().
                setDescription("Moderator"));
        if (role.size() == 0) {
            throw new NotFoundRoleException();
        }
        String roleId = ((ChatRoleModel) role.get(0)).getRoleId();

        // Add the user to the chat as a moderator.
        UserModel userModel = new UserModel().setUserId(userId).
                setRoles(new ArrayList<String>(Collections.singletonList(roleId)));
        ChatUserModel chatUserModel = new ChatUserModel().setChatId(chatId).
                setUsers(new ArrayList<UserModel>(Collections.singletonList(userModel)));

        // Add the chat to the list of chats the user is in.
        addChatToUserChatModel(userId, chatId);

        // Save the new items to the db.
        dao.createCollection("User", chatUserModel);
        dao.createCollection("Chat", chatModel);

        return chatModel;
    }

    /**
     * Adds a given chat to the list of chats that a given user is in.
     *
     * @param userId The id of the user
     * @param chatId The id of the chat to be added
     * @return A UserChat object with a list of chats the user is in
     */
    private UserChatModel addChatToUserChatModel(String userId, String chatId) {
        UserChatModel userChatModel;

        // Get current chats that the user is in.
        try {
            userChatModel = new UserChatModel().setUserId(userId);
            ArrayList<Object> userChat = dao.searchCollection("UserChat", userChatModel);

            // User does not exist.
            if (userChat.size() == 0) {
                throw new NotFoundUserException();
            }

            // get the list of chats.
            userChatModel = ((UserChatModel) userChat.get(0));
        } catch (NotFoundUserException e) {
            userChatModel = new UserChatModel().setUserId(userId).setChatId(new ArrayList<String>());
            dao.createCollection("UserChat", userChatModel);
        }

        // User not already in chat.
        if (!userChatModel.getChatId().contains(chatId)) {
            // Add the chat to the list of chats.
            userChatModel.getChatId().add(chatId);
            dao.updateCollection("UserChat", new UserChatModel().setUserId(userId), userChatModel);
        }

        return userChatModel;
    }

    /**
     * Return the chat details of a specific chat.
     *
     * @param getChatForm The input structure
     * @return A Chat object containing the chat details of the specific chat.
     */
    @Override
    public ChatModel getChat(GetChatForm getChatForm) {
        // Validate user input.
        String chatId = getChatForm.getChatId();
        if (chatId == null) {
            throw new InvalidRequestBodyException();
        }

        // Search for the chat.
        ChatModel chatModel = new ChatModel().setChatId(chatId);
        ArrayList<Object> chats = dao.searchCollection("Chat", chatModel);

        // Chat does not exist.
        if (chats.size() == 0) {
            throw new NotFoundChatException();
        }

        // Return the first chat found.
        return (ChatModel) chats.get(0);
    }

    /**
     * Modifies the name of a given chat.
     *
     * @param editChatNameForm The input structure.
     */
    @Override
    public void editChatName(EditChatNameForm editChatNameForm) {
        // Validate user input.
        String chatId = editChatNameForm.getChatId();
        String chatName = editChatNameForm.getChatName();

        if (chatId == null || chatName == null) {
            throw new InvalidRequestBodyException();
        }

        // Get the existing chat object and change the name.
        GetChatForm getChatForm = new GetChatForm().setChatId(chatId);
        ChatModel oldChatModel = new ChatModel().setChatId(chatId);
        ChatModel newChatModel = getChat(getChatForm).setName(chatName);

        // Update the collection in the database.
        dao.updateCollection("Chat", oldChatModel, newChatModel);
    }

    /**
     * Modifies the visibility of a given chat.
     *
     * @param editChatVisibilityForm The input structure.
     */
    @Override
    public void editChatVisibility(EditChatVisibilityForm editChatVisibilityForm) {
        // Validate user input.
        String chatId = editChatVisibilityForm.getChatId();
        String chatVisibility = editChatVisibilityForm.getVisibility();

        if (chatId == null || chatVisibility == null) {
            throw new InvalidRequestBodyException();
        }

        // Get the existing chat object and change the visibility.
        GetChatForm getChatForm = new GetChatForm().setChatId(chatId);
        ChatModel oldChatModel = new ChatModel().setChatId(chatId);
        ChatModel newChatModel = getChat(getChatForm).setVisibility(chatVisibility);

        // Update the collection in the database.
        dao.updateCollection("Chat", oldChatModel, newChatModel);
    }

    /**
     * Get the details of all existing chats.
     *
     * @return A list of Chat objects containing details for each of the chats.
     */
    @Override
    public ArrayList getAllChats() {
        return dao.getCollection("Chat", new ChatModel());
    }

    /**
     * Edit the community that a chat is associated with.
     *
     * @param editChatCommunityForm The input structure.
     * @return A Chat object that contains details about the chat.
     */
    @Override
    public ChatModel editChatCommunity(EditChatCommunityForm editChatCommunityForm) {
        // Validate user input.
        String chatId = editChatCommunityForm.getChatId();
        String communityId = editChatCommunityForm.getCommunityId();
        if (chatId == null || communityId == null) {
            throw new InvalidRequestBodyException();
        }

        // Get the existing chat object and change the visibility.
        GetChatForm getChatForm = new GetChatForm().setChatId(chatId);
        ChatModel oldChatModel = new ChatModel().setChatId(chatId);
        ChatModel newChatModel = getChat(getChatForm).setCommunity(communityId);

        // Update the collection in the database.
        dao.updateCollection("Chat", oldChatModel, newChatModel);

        return newChatModel;
    }

    /**
     * Get a list of public chats that a community is associated with
     *
     * @param getCommunityChatForm The input structure.
     * @return A list of Chat objects assocaited with the given commmunity.
     */
    @Override
    public ArrayList getCommunityChats(GetCommunityChatForm getCommunityChatForm) {
        String communityId = getCommunityChatForm.getCommunityId();
        if (communityId == null) {
            throw new InvalidRequestBodyException();
        }

        ChatModel chatModel = new ChatModel().setCommunity(communityId).setVisibility("public");
        return dao.searchCollection("Chat", chatModel);
    }
}