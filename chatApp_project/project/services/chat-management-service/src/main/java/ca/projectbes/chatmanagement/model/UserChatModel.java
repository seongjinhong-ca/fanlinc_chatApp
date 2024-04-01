package ca.projectbes.chatmanagement.model;

import java.util.ArrayList;

/**
 * Pojo to represent a UserChat document.
 * This document is used to map users to list of chats that they have relation with.
 *
 * @author Donnie Siu
 */
public class UserChatModel {
    private String userId;
    private ArrayList<String> chatId;

    // Setters and getters for instance variables.
    public ArrayList<String> getChatId() { return chatId; }
    public UserChatModel setChatId(ArrayList<String> chatId) { this.chatId = chatId; return this; }
    public String getUserId() { return userId; }
    public UserChatModel setUserId(String userId) { this.userId = userId; return this; }
}
