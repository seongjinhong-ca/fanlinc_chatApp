package ca.projectbes.chatmanagement.service;

import ca.projectbes.chatmanagement.datatransfer.*;
import ca.projectbes.chatmanagement.model.ChatUserModel;
import ca.projectbes.chatmanagement.model.UserChatModel;

import java.util.ArrayList;

/**
 * An interface for maintaining the users in a chat.
 *
 * @author Donnie Siu
 */
public interface ChatUserService {
    public ChatUserModel addUser(AddUserForm addUserForm);
    public ChatUserModel removeUser(RemoveUserForm removeUserForm);
    public ChatUserModel getAllUser(GetChatForm getChatForm);
    public UserChatModel getAllUserChats(GetUserForm getUserForm);
}