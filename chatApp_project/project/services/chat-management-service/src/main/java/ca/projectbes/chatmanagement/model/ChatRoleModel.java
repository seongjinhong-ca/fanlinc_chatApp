package ca.projectbes.chatmanagement.model;

import org.bson.types.ObjectId;

/**
 * Pojo to represent a Role document.
 *
 * @author Donnie Siu
 */
public class ChatRoleModel{
    private String roleId;
    private String description;

    // Setters and getters for instance variables.
    public String getRoleId() { return roleId; }
    public ChatRoleModel setRoleId(String roleId) { this.roleId = roleId; return this; }
    public String getDescription() { return description; }
    public ChatRoleModel setDescription(String description) { this.description = description; return this; }
}