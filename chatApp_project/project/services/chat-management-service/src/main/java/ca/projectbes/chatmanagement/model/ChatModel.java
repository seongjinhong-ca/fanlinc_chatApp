package ca.projectbes.chatmanagement.model;

/**
 * Pojo to represent a Chat document.
 *
 * @author Donnie Siu
 */
public class ChatModel {
    private String chatId;
    private String name;
    private String visibility;
    private String community;

    // Setters and getters for instance variables.
    public String getName() { return name; }
    public ChatModel setName(String name) { this.name = name; return this; }
    public String getVisibility() { return this.visibility; }
    public ChatModel setVisibility(String visibility) { this.visibility = visibility; return this; }
    public String getChatId() { return chatId; }
    public ChatModel setChatId(String chatId) { this.chatId = chatId; return this; }
    public String getCommunity() { return community; }
    public ChatModel setCommunity(String community) { this.community = community; return this; }
}