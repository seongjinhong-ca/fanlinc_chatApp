package ca.projectbes.chatmanagement.model;

import java.util.ArrayList;

/**
 * Pojo to represent a user object.
 *
 * @author Donnie Siu
 */
public class UserModel{
    private String userId;
    private ArrayList<String> roles;

    // Setters and getters for instance variables.
    public String getUserId() { return userId; }
    public UserModel setUserId(String userId) { this.userId = userId; return this; }
    public ArrayList<String> getRoles() { return roles; }
    public UserModel setRoles(ArrayList<String> roles) { this.roles = roles; return this; }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }

        // Object is not a UserModel.
        if (!UserModel.class.isAssignableFrom(obj.getClass())) {
            return false;
        }

        final UserModel userModel = (UserModel) obj;
        return (userModel.getUserId().equals(this.userId));
    }
}