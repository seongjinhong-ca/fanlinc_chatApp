package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to edit the chat name.
 *
 * @author Donnie Siu
 */
public class EditChatNameForm {
    @NotNull private String chatId;
    @NotNull private String chatName;

    public String getChatId() { return chatId; }
    public void setChatId(String chatId) { this.chatId = chatId; }
    public String getChatName() { return chatName; }
    public void setChatName(String chatName) { this.chatName = chatName; }
}