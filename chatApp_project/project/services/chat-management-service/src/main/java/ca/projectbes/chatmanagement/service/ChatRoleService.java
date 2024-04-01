package ca.projectbes.chatmanagement.service;

import ca.projectbes.chatmanagement.datatransfer.AddRoleForm;
import ca.projectbes.chatmanagement.model.ChatUserModel;

import java.util.ArrayList;

public interface ChatRoleService {

    public ArrayList getAllRoles();
    public ChatUserModel addRole(AddRoleForm addRoleForm);
}
