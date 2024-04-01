package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to edit the chat associated community.
 *
 * @author Donnie Siu
 */
public class EditChatCommunityForm {
    @NotNull private String chatId;
    @NotNull private String communityId;

    public String getChatId() { return chatId; }
    public void setChatId(String chatId) { this.chatId = chatId; }
    public String getCommunityId() { return communityId; }
    public void setCommunityId(String communityId) { this.communityId = communityId; }
}