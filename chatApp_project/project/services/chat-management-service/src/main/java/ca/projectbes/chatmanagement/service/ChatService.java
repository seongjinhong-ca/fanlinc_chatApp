package ca.projectbes.chatmanagement.service;

import ca.projectbes.chatmanagement.datatransfer.*;
import ca.projectbes.chatmanagement.model.ChatModel;

import java.util.ArrayList;

/**
 * An interface for maintaining general chat properties/settings.
 *
 * @author Donnie Siu
 */
public interface ChatService {
    public ChatModel createChat(CreateChatForm createChatForm);
    public ChatModel getChat(GetChatForm getChatForm);
    public void editChatName(EditChatNameForm editChatNameForm);
    public void editChatVisibility(EditChatVisibilityForm editChatVisibilityForm);
    public ArrayList getAllChats();
    public ChatModel editChatCommunity(EditChatCommunityForm editChatCommunityForm);
    public ArrayList getCommunityChats(GetCommunityChatForm getCommunityChatForm);
}