package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to remove a user from a chat.
 *
 * @author Donnie Siu
 */
public class RemoveUserForm {
    // One of the following two should not be null.
    private String userId;
    private String email;

    @NotNull private String chatId;

    public RemoveUserForm() {}

    public String getUserId() { return userId; }
    public RemoveUserForm setUserId(String userId) { this.userId = userId; return this; }
    public String getEmail() { return email; }
    public RemoveUserForm setEmail(String email) { this.email = email; return this; }
    public String getChatId() { return chatId; }
    public RemoveUserForm setChatId(String chatId) { this.chatId = chatId; return this; }
}