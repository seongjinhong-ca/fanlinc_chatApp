package ca.projectbes.chatmanagement.controller;

import ca.projectbes.chatmanagement.datatransfer.AddRoleForm;
import ca.projectbes.chatmanagement.model.ChatUserModel;
import ca.projectbes.chatmanagement.service.ChatRoleService;
import ca.projectbes.chatmanagement.service.ChatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

/**
 * A REST controller that defines the API endpoints.
 *
 * @author Seongjin Hong
 */
@CrossOrigin(origins = "*")
@RestController
public class ChatRoleController {
    private final String baseurl = "/rest/fanlinc/chatmanagement";

    @Autowired
    private ChatRoleService chatRoleService;

    @RequestMapping(value=baseurl + "/all_role", method=GET)
    public ArrayList getAllChats() {
        return chatRoleService.getAllRoles();
    }
    @RequestMapping(value=baseurl + "/role", method=PUT)
    public ChatUserModel addRole(@RequestBody AddRoleForm addRoleForm){
        return chatRoleService.addRole(addRoleForm);
    }
}
