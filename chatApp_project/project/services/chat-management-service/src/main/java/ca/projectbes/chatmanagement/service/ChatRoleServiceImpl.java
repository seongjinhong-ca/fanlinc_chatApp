package ca.projectbes.chatmanagement.service;

import ca.projectbes.chatmanagement.datatransfer.AddRoleForm;
import ca.projectbes.chatmanagement.exception.InvalidRequestBodyException;
import ca.projectbes.chatmanagement.exception.NotFoundChatException;
import ca.projectbes.chatmanagement.exception.NotFoundUserException;
import ca.projectbes.chatmanagement.model.ChatRoleModel;
import ca.projectbes.chatmanagement.model.ChatUserModel;
import ca.projectbes.chatmanagement.model.UserModel;
import ca.projectbes.chatmanagement.repository.ChatManagementDAO;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class ChatRoleServiceImpl implements ChatRoleService{
    private ChatManagementDAO dao;

    public ChatRoleServiceImpl() {
        this.dao = ChatManagementDAO.getDAO();
    }

    @Override
    public ArrayList getAllRoles() {
        return dao.getCollection("Role", new ChatRoleModel());
    }

    @Override
    public ChatUserModel addRole(AddRoleForm addRoleForm) {
        // Validate the input.
        String userId = addRoleForm.getUserId();
        String chatId = addRoleForm.getChatId();
        String roleId = addRoleForm.getRoleId();
        if (userId == null || roleId == null || chatId == null) {
            throw new InvalidRequestBodyException();
        }

        // Get the existing chat users.
        ChatUserModel oldChatUserModel = new ChatUserModel().setChatId(chatId);
        ArrayList chatUsers = dao.searchCollection("User", oldChatUserModel);
        if (chatUsers.size() == 0) {
            throw new NotFoundChatException();
        }
        ChatUserModel newChatUserModel = (ChatUserModel) chatUsers.get(0);

        // Find the user within the list of chat users.
        UserModel userModel = new UserModel().setUserId(userId);
        int user_index = newChatUserModel.getUsers().indexOf(userModel);

        // User not found
        if (user_index == -1) {
            throw new NotFoundUserException();
        }

        // Get the actual user object.
        userModel = newChatUserModel.getUsers().get(user_index);

        // Add the role.
        userModel.getRoles().add(roleId);

        // Update the collection in the database.
        dao.updateCollection("User", oldChatUserModel, newChatUserModel);

        return newChatUserModel;
    }
}
