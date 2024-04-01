package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

/**
 * A class to represent the output structure to get userid given the email.
 *
 * @author Donnie Siu
 */
public class GetUseridByEmailForm {
    @NotNull private String uid;
    @NotNull private boolean emailVerified;

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }
    public boolean getEmailVerified() { return emailVerified; }
    public void setEmailVerified(boolean emailVerified) { this.emailVerified = emailVerified; }
}