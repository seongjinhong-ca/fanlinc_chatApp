package ca.projectbes.chatmanagement.model;

import java.util.ArrayList;

/**
 * Pojo to represent a User document.
 *
 * @author Donnie Siu
 */
public class ChatUserModel {
    private String chatId;
    private ArrayList<UserModel> users;

    // Setters and getters for instance variables.
    public ArrayList<UserModel> getUsers() { return users; }
    public ChatUserModel setUsers(ArrayList<UserModel> users) { this.users = users; return this; }
    public String getChatId() { return chatId; }
    public ChatUserModel setChatId(String chatId) { this.chatId = chatId; return this; }
}
