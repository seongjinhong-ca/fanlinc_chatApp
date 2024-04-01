package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to invite a user to a given chat.
 *
 * @author Donnie Siu
 */
public class InviteUserForm {
    @NotNull private String email;
    @NotNull private String chatId;

    public InviteUserForm() {}

    public String getEmail() { return email; }
    public InviteUserForm setEmail(String email) { this.email = email; return this; }
    public String getChatId() { return chatId; }
    public InviteUserForm setChatId(String chatId) { this.chatId = chatId; return this; }
}