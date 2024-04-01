package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the input structure to get chat details for a specific user.
 *
 * @author Donnie Siu
 */
public class GetUserForm {
    @NotNull private String userId;

    public GetUserForm() {}

    public String getUserId() { return userId; }
    public GetUserForm setUserId(String userId) { this.userId = userId; return this; }
}