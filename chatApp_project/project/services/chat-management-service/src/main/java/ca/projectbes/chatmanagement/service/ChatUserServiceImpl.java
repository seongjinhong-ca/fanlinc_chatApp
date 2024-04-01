package ca.projectbes.chatmanagement.service;

import ca.projectbes.chatmanagement.datatransfer.*;
import ca.projectbes.chatmanagement.exception.InvalidRequestBodyException;
import ca.projectbes.chatmanagement.exception.NotFoundChatException;
import ca.projectbes.chatmanagement.exception.NotFoundUserException;
import ca.projectbes.chatmanagement.model.ChatUserModel;
import ca.projectbes.chatmanagement.model.UserChatModel;
import ca.projectbes.chatmanagement.model.UserModel;
import ca.projectbes.chatmanagement.repository.ChatManagementDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Properties;

/**
 * Implementation of the ChatUserService interface.
 *
 * @author Donnie Siu
 */
@Service
public class ChatUserServiceImpl implements ChatUserService {
    private ChatManagementDAO dao;

    public ChatUserServiceImpl() {
        this.dao = ChatManagementDAO.getDAO();
    }

    /**
     * Adds a given user to a given chat.
     *
     * @param addUserForm The format of input.
     * @return A ChatUser object containing a list of users for a given chat.
     */
    @Override
    public ChatUserModel addUser(AddUserForm addUserForm) {
        String userId = addUserForm.getUserId();
        String chatId = addUserForm.getChatId();
        String email = addUserForm.getEmail();
        if ((userId == null && email == null) || chatId == null) {
            throw new InvalidRequestBodyException();
        }

        if (userId == null) {
            userId = getUseridByEmail(email);
        }

        ChatUserModel oldChatUserModel = new ChatUserModel().setChatId(chatId);
        ArrayList chatUsers = dao.searchCollection("User", oldChatUserModel);
        if (chatUsers.size() == 0) {
            throw new NotFoundChatException();
        }

        ChatUserModel newChatUserModel = (ChatUserModel) chatUsers.get(0);
        UserModel newUserModel = new UserModel().setUserId(userId).setRoles(new ArrayList<String>());
        ArrayList<UserModel> userModels = newChatUserModel.getUsers();

        if (!userModels.contains(newUserModel)) {
            userModels.add(newUserModel);
            dao.updateCollection("User", oldChatUserModel, newChatUserModel);
        }

        addChatToUserChatModel(userId, chatId);
        return newChatUserModel;
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

        try {
            userChatModel = getAllUserChats(new GetUserForm().setUserId(userId));
        } catch (NotFoundUserException e) {
            userChatModel = new UserChatModel().setUserId(userId).setChatId(new ArrayList<String>());
            dao.createCollection("UserChat", userChatModel);
        }

        if (!userChatModel.getChatId().contains(chatId)) {
            userChatModel.getChatId().add(chatId);
            dao.updateCollection("UserChat", new UserChatModel().setUserId(userId), userChatModel);
        }

        return userChatModel;
    }

    /**
     * Removes a given chat from the list of chats that a given user is in.
     *
     * @param userId The id of the user.
     * @param chatId The id of the chat to be removed.
     * @return A UserChat object with a list of chats that the user is in.
     */
    private UserChatModel removeChatFromUserChatModel(String userId, String chatId) {
        UserChatModel userChatModel;

        try {
            userChatModel = getAllUserChats(new GetUserForm().setUserId(userId));
        } catch (NotFoundUserException e) {
            userChatModel = new UserChatModel().setUserId(userId).setChatId(new ArrayList<String>());
        }

        if (userChatModel.getChatId().contains(chatId)) {
            userChatModel.getChatId().remove(chatId);
            dao.updateCollection("UserChat", new UserChatModel().setUserId(userId), userChatModel);
        }

        return userChatModel;
    }

    /**
     * Removes a given user from a given chat.
     *
     * @param removeUserForm The format of input.
     * @return A ChatUser object containing a list of users for a given chat.
     */
    @Override
    public ChatUserModel removeUser(RemoveUserForm removeUserForm) {
        String userId = removeUserForm.getUserId();
        String chatId = removeUserForm.getChatId();
        String email = removeUserForm.getEmail();
        if ((userId == null && email == null) || chatId == null) {
            throw new InvalidRequestBodyException();
        }

        if (userId == null) {
            userId = getUseridByEmail(email);
        }

        ChatUserModel oldChatUserModel = new ChatUserModel().setChatId(chatId);
        ChatUserModel newChatUserModel = getAllUser(new GetChatForm().setChatId(chatId));
        ArrayList<UserModel> userModelList = newChatUserModel.getUsers();

        if (!userModelList.remove(new UserModel().setUserId(userId))) {
            throw new NotFoundUserException();
        }

        removeChatFromUserChatModel(userId, chatId);
        dao.updateCollection("User", oldChatUserModel, newChatUserModel);
        return newChatUserModel;
    }

    /**
     * Returns a list of users for a given chat.
     *
     * @param getChatForm The format of input.
     * @return A ChatUser object containing a list of users for a given chat.
     */
    @Override
    public ChatUserModel getAllUser(GetChatForm getChatForm) {
        String chatId = getChatForm.getChatId();
        if (chatId == null) {
            throw new InvalidRequestBodyException();
        }

        ChatUserModel chatUserModel = new ChatUserModel().setChatId(chatId);
        ArrayList<Object> users = dao.searchCollection("User", chatUserModel);

        if (users.size() == 0) {
            throw new NotFoundChatException();
        }

        return (ChatUserModel) users.get(0);
    }

    /**
     * Returns a list of chats that a given user is in.
     *
     * @param getUserForm The format of input.
     * @return A UserChat object that contains a list of chats that the user is in.
     */
    @Override
    public UserChatModel getAllUserChats(GetUserForm getUserForm) {
        String userId = getUserForm.getUserId();
        if (userId == null) {
            throw new InvalidRequestBodyException();
        }

        UserChatModel userChatModel = new UserChatModel().setUserId(userId);
        ArrayList<Object> userChat = dao.searchCollection("UserChat", userChatModel);

        if (userChat.size() == 0) {
            throw new NotFoundUserException();
        }

        return ((UserChatModel) userChat.get(0));
    }

    /**
     * Given a email address returns the userid corresponding to that email.
     *
     * @param email The email of the user.
     * @return The userid corresponding to the given email.
     */
    private String getUseridByEmail(String email) {
        try {
            String endpoint = getIdentityURI() + "/user/get/uid/" + email;
            RestTemplate restTemplate = new RestTemplate();
            GetUseridByEmailForm getUseridByEmailForm = restTemplate.getForObject(endpoint, GetUseridByEmailForm.class);
            return getUseridByEmailForm.getUid();
        } catch (Exception e) {
            throw new NotFoundUserException();
        }
    }

    /**
     * Return the URI for the identity service from the properties file.
     *
     * @return The URI for the identity service.
     */
    private String getIdentityURI() throws IOException {
        String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
        String appConfigPath = rootPath + "application.properties";
        Properties appProps = new Properties();
        appProps.load(new FileInputStream(appConfigPath));
        return appProps.getProperty("IdentityServiceURI");
    }
}
