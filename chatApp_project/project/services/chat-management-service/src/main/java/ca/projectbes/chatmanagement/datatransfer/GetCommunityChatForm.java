package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to get a list of chats associated with a community.
 *
 * @author Donnie Siu
 */
public class GetCommunityChatForm {
    @NotNull private String communityId;

    public String getCommunityId() { return communityId; }
    public void setCommunityId(String communityId) { this.communityId = communityId; }
}