package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to get chat details.
 *
 * @author Donnie Siu
 */
public class GetChatForm {
    @NotNull private String chatId;

    public GetChatForm() {}

    public String getChatId() { return chatId; }
    public GetChatForm setChatId(String chatId) { this.chatId = chatId; return this; }
}