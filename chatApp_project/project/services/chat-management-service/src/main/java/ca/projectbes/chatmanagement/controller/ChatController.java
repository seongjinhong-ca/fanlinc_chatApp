package ca.projectbes.chatmanagement.controller;

import ca.projectbes.chatmanagement.datatransfer.*;
import ca.projectbes.chatmanagement.model.ChatModel;
import ca.projectbes.chatmanagement.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * A REST controller that defines the API endpoints.
 *
 * @author Donnie Siu
 */
@CrossOrigin(origins = "*")
@RestController
public class ChatController {
    private final String baseurl = "/rest/fanlinc/chatmanagement";

    @Autowired
    private ChatService chatService;

    /**
     * Creates new chat.
     *
     * @param createChatForm is request body.
     * @return ChatModel object containing the details of the newly created chat.
     */
    @RequestMapping(value=baseurl + "/chat", method=PUT)
    public ChatModel createChat(@RequestBody CreateChatForm createChatForm) {
        return chatService.createChat(createChatForm);
    }

    /**
     * Returns the chat details given the chatId.
     *
     * @param getChatForm is request body.
     * @return ChatModel object containing the chat details.
     */
    @RequestMapping(value=baseurl + "/chat", method=GET)
    public ChatModel getChat(@RequestBody GetChatForm getChatForm) {
        return chatService.getChat(getChatForm);
    }

    /**
     * Edits the chat name.
     *
     * @param editChatNameForm is request body.
     */
    @RequestMapping(value=baseurl + "/chat/name", method=PUT)
    public void editChatName(@RequestBody EditChatNameForm editChatNameForm) {
        chatService.editChatName(editChatNameForm);
    }

    /**
     * Edits the chat visibility.
     *
     * @param editChatVisibilityForm is request body.
     */
    @RequestMapping(value=baseurl + "/chat/visibility", method=PUT)
    public void editChatVisibility(@RequestBody EditChatVisibilityForm editChatVisibilityForm) {
        chatService.editChatVisibility(editChatVisibilityForm);
    }

    /**
     * Get the details of all the existing chats.
     *
     * @return An ArrayList of objects containing details for all of the existing chats.
     */
    @RequestMapping(value=baseurl + "/all_chats", method=GET)
    public ArrayList getAllChats() {
        return chatService.getAllChats();
    }

    /**
     * Modify the associated community for a given chat.
     *
     * @param editChatCommunityForm is request body.
     * @return A Chat object containing the chat details.
     */
    @RequestMapping(value=baseurl + "/chat/community", method=PUT)
    public ChatModel setCommunity(@RequestBody EditChatCommunityForm editChatCommunityForm) {
        return chatService.editChatCommunity(editChatCommunityForm);
    }

    /**
     * Returns a list of public chats associated with a community.
     *
     * @param getCommunityChatForm is request body.
     * @return A list of chats associated with a community.
     */
    @RequestMapping(value=baseurl + "/chat/community", method=GET)
    public ArrayList getCommunityChats(@RequestBody GetCommunityChatForm getCommunityChatForm) {
        return chatService.getCommunityChats(getCommunityChatForm);
    }
}