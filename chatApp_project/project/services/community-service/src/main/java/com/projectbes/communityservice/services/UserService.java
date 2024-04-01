package com.projectbes.communityservice.services;

import com.projectbes.communityservice.dtos.eventDtos.EditDeleteForm;
import com.projectbes.communityservice.dtos.eventDtos.EventIdForm;
import com.projectbes.communityservice.dtos.eventDtos.ImageForm;
import com.projectbes.communityservice.dtos.postDtos.CreateFromEventForm;
import com.projectbes.communityservice.dtos.postDtos.PostIdForm;
import com.projectbes.communityservice.dtos.postDtos.EditForm;
import com.projectbes.communityservice.dtos.userDtos.*;
import com.projectbes.communityservice.exceptions.ElementExists;
import com.projectbes.communityservice.exceptions.ElementNotFound;
import com.projectbes.communityservice.exceptions.Forbidden;
import com.projectbes.communityservice.exceptions.InvalidRequestBody;
import com.projectbes.communityservice.models.User;

/**
 * This is interface that defines all User related services
 * @author Minh Hoang Nguyen
 */
public interface UserService {

	/**
	 * Creates a new user
	 * @param createForm contains uid of user
	 * @throws ElementExists if user with such uid already exists
	 */
	void createUser(com.projectbes.communityservice.dtos.userDtos.CreateForm createForm);

	/**
	 * Get user with given uid
	 * @param uid given uid
	 * @return User with given uid
	 * @throws ElementNotFound when user cannot be found
	 */
	User getUser(String uid);

	/**
	 * Checks if user joined a community of not
	 * @param uid of user
	 * @param communityId is id of community
	 * @return true if user joined community
	 */
	boolean joinedCommunity(String uid, Long communityId);

	/**
	 * Establish [:JOINED] relationship between user and community (user join community)
	 * @param uid is uid of user
	 * @param joinForm contains id of community, and proficiency level
	 * @throws ElementNotFound when either user or community doesn't exist
	 * @throws ElementExists if user already joined the community
	 */
	void joinCommunity(String uid, JoinCommunityOrChangePLForm joinForm);

	/**
	 * Leave a community
	 * @param uid is uid of user
	 * @param leaveForm contains id of community
	 * @throws ElementNotFound User or Community or Relationship not found
	 */
	void leaveCommunity(String uid, CommunityIdForm leaveForm);

	/**
	 * Changes proficiency level with which user joined community
	 * @param uid is uid of user
	 * @param changePLForm contains id of community
	 * @throws ElementNotFound User or Community or Relationship not found
	 */
	void changeProficiencyLevel(String uid, JoinCommunityOrChangePLForm changePLForm);

	/**
	 * Make user host an event - create new event and make given user the host
	 * @param uid of the user host
	 * @param eventCreateForm contains information about the event
	 * @return id of newly created Event
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden when User tries to create an event in a community user never joined
	 */
	Long hostEvent(String uid,
				   com.projectbes.communityservice.dtos.eventDtos.CreateForm eventCreateForm);

	/**
	 * Make user attend the event - create ATTENDING relationship between user and event
	 * @param uid is uid of user
	 * @param attendEventForm contains id of event
	 * @throws ElementNotFound if user or event do not exist
	 */
	void attendEvent(String uid, EventIdForm attendEventForm);

	/**
	 * Make user unattend the event - remove ATTENDING relationship between user and event
	 * @param uid is uid of user
	 * @param eventIdForm contains id of event
	 * @throws ElementNotFound if user or event do not exist
	 */
	void unattendEvent(String uid, EventIdForm eventIdForm);

	/**
	 * Make user cohost the event - create HOSTING relationship between user and event
	 * @param uid is uid of user
	 * @param cohostEventForm contains id of event
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden when User tries to create an event in a community user never joined
	 */
	void cohostEvent(String uid, EventIdForm cohostEventForm);

	/**
	 * Edits an event (user must be hosting it to be allowed to edit it)
	 * @param uid is uid of user
	 * @param editForm contains edit information of event
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden when none host user attempts to edit the event
	 * @throws InvalidRequestBody if end date of edited event is before start date
	 */
	void editEvent(String uid, EditDeleteForm editForm);

	/**
	 * Deletes an event (user must be hosting it to be allowed to delete it)
	 * @param uid is uid of user
	 * @param deleteForm contains edit information of event
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden when none host user attempts to delete the event
	 */
	void deleteEvent(String uid, EditDeleteForm deleteForm);

	/**
	 * Sets a new theme image link
	 * @param uid of user who wants to set new theme image
	 * @param imageForm contains event id and link of new image
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden if user is not event host
	 */
	void setEventThemeImage(String uid, ImageForm imageForm);

	/**
	 * Creates a new post in event
	 * @param uid of user who wants to create new post
	 * @param createForm contains event's id and title, description, image link of post
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden if user is not event host
	 */
	Long addEventPost(String uid, CreateFromEventForm createForm);

	/**
	 * Removes an image link from event list of image links
	 * @param uid of user who wants to set new theme image
	 * @param postIdForm contains post id
	 * @throws ElementNotFound if user or post do not exist
	 * @throws Forbidden if user is not the one who made the post
	 */
	void deletePost(String uid, PostIdForm postIdForm);

	/**
	 * Checks to see if user with given uid posted post with given postId
	 * @param uid of user
	 * @param postId of post
	 * @return true if user posted the post
	 * @throws ElementNotFound if user or post do not exist
	 */
	boolean isPostPoster(String uid, Long postId);

	/**
	 * Edits a post
	 * @param uid of user who wants to edit the post
	 * @param editForm contains post's id, title, description, image link
	 * @throws ElementNotFound if user or post do not exist
	 * @throws Forbidden if user is not the one who posted the post
	 */
	void editPost(String uid, EditForm editForm);
}
