package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to edit the chat visibility.
 *
 * @author Donnie Siu
 */
public class EditChatVisibilityForm {
    @NotNull private String chatId;
    @NotNull private String visibility;

    public String getChatId() { return chatId; }
    public void setChatId(String chatId) { this.chatId = chatId; }
    public String getVisibility() { return visibility; }
    public void setVisibility(String visibility) { this.visibility = visibility; }
}