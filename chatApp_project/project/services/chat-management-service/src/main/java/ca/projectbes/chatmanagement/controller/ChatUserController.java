package ca.projectbes.chatmanagement.controller;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import ca.projectbes.chatmanagement.datatransfer.*;
import ca.projectbes.chatmanagement.model.ChatUserModel;
import ca.projectbes.chatmanagement.model.UserChatModel;
import ca.projectbes.chatmanagement.service.ChatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@CrossOrigin(origins = "*")
@RestController
public class ChatUserController {
    private final String baseurl = "/rest/fanlinc/chatmanagement";

    @Autowired
    private ChatUserService chatUserService;

    /**
     * Adds a user to a given chat.
     *
     * @param addUserForm is the request body.
     * @return a chat user object.
     */
    @RequestMapping(value=baseurl + "/user", method=PUT)
    public ChatUserModel addUser(@RequestBody AddUserForm addUserForm) {
        return chatUserService.addUser(addUserForm);
    }

    /**
     * Removes a user from a given chat.
     *
     * @param removeUserForm is the request body.
     * @return a chat user object.
     */
    @RequestMapping(value=baseurl + "/user", method=DELETE)
    public ChatUserModel removeUser(@RequestBody RemoveUserForm removeUserForm) {
        return chatUserService.removeUser(removeUserForm);
    }

    /**
     * Get a list of users in a given chat.
     *
     * @param getChatForm is the request body format.
     * @return A ChatUser object containing a list of users.
     */
    @RequestMapping(value=baseurl + "/all_users", method=GET)
    public ChatUserModel getAllUser(@RequestBody GetChatForm getChatForm) {
        return chatUserService.getAllUser(getChatForm);
    }


    /**
     * Gets a list of chats that a given user is part of.
     *
     * @param getUserForm is the request body format
     * @return A UserChat object containing a list of chats.
     */
    @RequestMapping(value=baseurl + "/all_user_chats", method=GET)
    public UserChatModel getAllUserChats(@RequestBody GetUserForm getUserForm) {
        return chatUserService.getAllUserChats(getUserForm);
    }
}