package com.projectbes.communityservice.controllers;


import javax.validation.Valid;

import com.projectbes.communityservice.dtos.eventDtos.EditDeleteForm;
import com.projectbes.communityservice.dtos.eventDtos.EventIdForm;
import com.projectbes.communityservice.dtos.eventDtos.ImageForm;
import com.projectbes.communityservice.dtos.postDtos.CreateFromEventForm;
import com.projectbes.communityservice.dtos.postDtos.PostIdForm;
import com.projectbes.communityservice.dtos.postDtos.EditForm;
import com.projectbes.communityservice.dtos.userDtos.*;
import com.projectbes.communityservice.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projectbes.communityservice.dtos.userDtos.JoinCommunityOrChangePLForm;
import com.projectbes.communityservice.services.UserService;


/**
 * This is a REST controller for User
 * @author Minh Hoang Nguyen
 *
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rest/fanlinc/users")
public class UserController {

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
			this.userService = userService;
	}

	/**
	 * Post request handler: creates new User
	 * @param createForm is request body
	 */
	@PostMapping
	public void createUser(
			@Valid @RequestBody CreateForm createForm) {
		userService.createUser(createForm);
	}

	/**
	 * Get request handler with path variable {id}
	 * @param uid - the id path variable
	 * @return community with given id
	 */
	@GetMapping("/{uid}")
	public User getUser(@PathVariable String uid) {
		return userService.getUser(uid);
	}

	/**
	 * Checks if user joined a community of not
	 * @param uid of user
	 * @param cid is id of community
	 * @return true if user joined community
	 */
	@GetMapping("/{uid}/joinedCommunity/{cid}")
	public boolean joinedCommunity(@PathVariable String uid, @PathVariable Long cid) {
		return userService.joinedCommunity(uid, cid);
	}

	/**
	 * Put request handler: make a user join a community with proficiency level
	 * @param joinForm is request body that contains community id and proficiency level
	 */
	@PutMapping("/{uid}/joinCommunity")
	public void joinCommunity(@PathVariable String uid,
							  @Valid @RequestBody JoinCommunityOrChangePLForm joinForm) {
		userService.joinCommunity(uid, joinForm);
	}

	/**
	 * Post request handler: make a user leave a community
	 */
	@PutMapping("/{uid}/leaveCommunity")
	public void leaveCommunity(@PathVariable String uid,
							   @Valid @RequestBody CommunityIdForm leaveForm) {
		userService.leaveCommunity(uid, leaveForm);
	}

	/**
	 * Put request handler: make a user join a community with proficiency level
	 * @param changePLForm is request body that contains community id and proficiency level
	 */
	@PutMapping("/{uid}/changeProficiencyLevel")
	public void changeProficiencyLevel(@PathVariable String uid, @Valid @RequestBody
			JoinCommunityOrChangePLForm changePLForm) {
		userService.changeProficiencyLevel(uid, changePLForm);
	}

	/**
	 * Post request handler: create an event an make the user one of it's hosts
	 * @param uid of user
	 * @param eventCreateForm contains information about the event
	 */
	@PostMapping("/{uid}/hostEvent")
	public Long hostEvent(@PathVariable String uid, @Valid @RequestBody
			com.projectbes.communityservice.dtos.eventDtos.CreateForm eventCreateForm) {
		return userService.hostEvent(uid, eventCreateForm);
	}

	/**
	 * Put request handler: make a user attend event (add user to list of attending users of event)
	 * @param uid of user
	 * @param attendEventForm contains event id
	 */
	@PutMapping("/{uid}/attendEvent")
	public void attendEvent(@PathVariable String uid,
							@Valid @RequestBody EventIdForm attendEventForm) {
		userService.attendEvent(uid, attendEventForm);
	}

	/**
	 * Put request handler: make a user unattend event
	 * @param uid of user
	 * @param eventIdForm contains event id
	 */
	@PutMapping("/{uid}/unattendEvent")
	public void unattendEvent(@PathVariable String uid,
							  @Valid @RequestBody EventIdForm eventIdForm) {
		userService.unattendEvent(uid, eventIdForm);
	}

	/**
	 * Put request handler: make a user cohost event (add user to list of hosting users of event)
	 * @param uid of user
	 * @param cohostEventForm contains information about the event
	 */
	@PutMapping("/{uid}/cohostEvent")
	public void cohostEvent(@PathVariable String uid,
							@Valid @RequestBody EventIdForm cohostEventForm) {
		userService.cohostEvent(uid, cohostEventForm);
	}

	/**
	 * Put request handler: edit event (user must be a host of that event)
	 * @param uid of user
	 * @param editForm contains information about the event
	 */
	@PutMapping("/{uid}/editEvent")
	public void editEvent(@PathVariable String uid, @Valid @RequestBody EditDeleteForm editForm) {
		userService.editEvent(uid, editForm);
	}

	/**
	 * Delete request handler: delete event (user must be a host of that event)
	 * @param uid of user
	 * @param deleteForm contains event's id
	 */
	@DeleteMapping("/{uid}/deleteEvent")
	public void deleteEvent(@PathVariable String uid,
							@Valid @RequestBody EditDeleteForm deleteForm) {
		userService.deleteEvent(uid, deleteForm);
	}

	/**
	 * Put request handler: set new event theme image
	 * @param uid of user
	 * @param imageForm contains event's id and new link
	 */
	@PutMapping("/{uid}/setEventThemeImage")
	public void setEventThemeImage(@PathVariable String uid,
								   @Valid @RequestBody ImageForm imageForm) {
		userService.setEventThemeImage(uid, imageForm);
	}

	/**
	 * Post request handler: add new post to event
	 * @param uid of user
	 * @param createForm contains event's id and title, description, image link of post
	 */
	@PostMapping("/{uid}/addEventPost")
	public Long addEventPost(@PathVariable String uid,
							 @Valid @RequestBody CreateFromEventForm createForm) {
		return userService.addEventPost(uid, createForm);
	}

	/**
	 * Put request handler: edit a post
	 * @param uid of user
	 * @param editForm contains new information of post, and post id
	 */
	@PutMapping("/{uid}/editPost")
	public void editPost(@PathVariable String uid, @Valid @RequestBody EditForm editForm) {
		userService.editPost(uid, editForm);
	}

	/**
	 * Delete request handler: delete an event post
	 * @param uid of user
	 * @param postIdForm contains postOd
	 */
	@DeleteMapping("/{uid}/deletePost")
	public void deletePost(@PathVariable String uid,
						   @Valid @RequestBody PostIdForm postIdForm) {
		userService.deletePost(uid, postIdForm);
	}

	/**
	 * Get handler: check to see if user posted the post
	 */
	@GetMapping("{uid}/postedPost/{pid}")
	public boolean postedPost(@PathVariable String uid, @PathVariable Long pid) {
		return userService.isPostPoster(uid, pid);
	}

}
