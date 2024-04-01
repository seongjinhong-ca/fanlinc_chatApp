package ca.projectbes.chatmanagement.datatransfer;

import javax.validation.constraints.NotNull;

public class AddRoleForm {

    @NotNull private String chatId;
    @NotNull private String userId;
    @NotNull private String roleId;

    public String getUserId() { return userId; }
    public String getChatId() { return chatId; }
    public String getRoleId() { return roleId; }
    public void setChatId(String chatId) { this.chatId = chatId; }
    public void setRoleId(String roleId) { this.roleId = roleId; }
    public void setUserId(String userId) { this.userId = userId; }
}
