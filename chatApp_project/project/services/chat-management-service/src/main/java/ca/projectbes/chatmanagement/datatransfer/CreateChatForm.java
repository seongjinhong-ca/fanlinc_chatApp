package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to create a new chat.
 *
 * @author Donnie Siu
 */
public class CreateChatForm {
    @NotNull private String userId;
    @NotNull private String chatName;

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getChatName() { return chatName; }
    public void setChatName(String chatName) { this.chatName = chatName; }
}