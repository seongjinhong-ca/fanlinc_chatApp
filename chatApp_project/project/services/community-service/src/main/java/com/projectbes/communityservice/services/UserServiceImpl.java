package com.projectbes.communityservice.services;

import com.projectbes.communityservice.dtos.eventDtos.EditDeleteForm;
import com.projectbes.communityservice.dtos.eventDtos.EventIdForm;
import com.projectbes.communityservice.dtos.eventDtos.ImageForm;
import com.projectbes.communityservice.dtos.postDtos.CreateFromEventForm;
import com.projectbes.communityservice.dtos.postDtos.PostIdForm;
import com.projectbes.communityservice.dtos.postDtos.EditForm;
import com.projectbes.communityservice.dtos.userDtos.*;
import com.projectbes.communityservice.exceptions.Forbidden;
import com.projectbes.communityservice.exceptions.InvalidRequestBody;
import com.projectbes.communityservice.models.*;
import org.springframework.aop.AopInvocationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectbes.communityservice.dtos.userDtos.JoinCommunityOrChangePLForm;
import com.projectbes.communityservice.exceptions.ElementExists;
import com.projectbes.communityservice.exceptions.ElementNotFound;
import com.projectbes.communityservice.repositories.UserRepository;

/**
 * This class includes implementation of all the User related services
 * @author Minh Hoang Nguyen
 *
 */
@Service
public class UserServiceImpl implements UserService {

	private UserRepository userRepository;
	private CommunityService communityService;
	private EventService eventService;
	private PostService postService;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, CommunityService communityService,
						   EventService eventService, PostService postService) {
		this.userRepository = userRepository;
		this.communityService = communityService;
		this.eventService = eventService;
		this.postService = postService;
	}

	/**
	 * Creates a new user
	 * @param createForm contains uid of user
	 * @throws ElementExists if user with such uid already exists
	 */
	@Override
	public void createUser(CreateForm createForm) {
		if (findUser(createForm.getUid()) != null) {
			throw new ElementExists("User exists");
		}
		userRepository.save(new User(createForm.getUid()));
	}

	/**
	 * Get user with given uid
	 * @param uid given uid
	 * @return User with given uid
	 * @throws ElementNotFound when user cannot be found
	 */
	@Override
	public User getUser(String uid) {
		User user = userRepository.findUser(uid);
		if (user == null) {
			throw new ElementNotFound("User not found");
		}
		return userRepository.findById(user.getId()).get();
	}

	/**
	 * Checks if user joined a community of not
	 * @param uid of user
	 * @param communityId is id of community
	 * @return true if user joined community
	 */
	@Override
	public boolean joinedCommunity(String uid, Long communityId) {
		boolean result;
		try {
			result = userRepository.alreadyJoined(uid, communityId);
		} catch (AopInvocationException e) {
			throw new ElementNotFound();
		}
		return result;
	}

	/**
	 * Establish [:JOINED] relationship between user and community (user join community)
	 * @param uid is uid of user
	 * @param joinForm contains id of community, and proficiency level
	 * @throws ElementNotFound when either user or community doesn't exist
	 * @throws ElementExists if user already joined the community
	 */
	@Override
	public void joinCommunity(String uid, JoinCommunityOrChangePLForm joinForm) {
		Long cid = joinForm.getCommunityId();
		Community community = communityService.findCommunity(cid, new ElementNotFound());
		User user = getUser(uid);
		if (userRepository.alreadyJoined(uid, cid)) {
			throw new ElementExists("User already joined community");
		}
		Joined joined = new Joined(user, community, joinForm.getProficiencyLevel());
		user.joinCommunity(joined);
		userRepository.save(user, 1);
	}

	/**
	 * Leave a community
	 * @param uid is uid of user
	 * @param leaveForm contains id of community
	 * @throws ElementNotFound User or Community or Relationship not found
	 */
	@Override
	public void leaveCommunity(String uid, CommunityIdForm leaveForm) {
		Long cid = leaveForm.getCommunityId();
		// check if user joined the community
		checkUserJoinedCommunity(uid, cid);
		// leave community
		userRepository.leaveCommunity(uid, cid);
	}

	/**
	 * Changes proficiency level with which user joined community
	 * @param uid is uid of user
	 * @param changePLForm contains id of community
	 * @throws ElementNotFound User or Community or Relationship not found
	 */
	@Override
	public void changeProficiencyLevel(String uid, JoinCommunityOrChangePLForm changePLForm) {
		Long cid = changePLForm.getCommunityId();
		// check if user joined the community
		checkUserJoinedCommunity(uid, cid);
		// change proficiency level
		userRepository.changeProficiencyLevel(uid, cid, changePLForm.getProficiencyLevel());
	}

	/**
	 * Make user host an event - create new event and make given user the host
	 * @param uid of the user host
	 * @param createForm contains information about the event
	 * @return id of newly created Event
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden when User tries to create an event in a community user never joined
	 */
	@Override
	public Long hostEvent(String uid,
						  com.projectbes.communityservice.dtos.eventDtos.CreateForm createForm) {
		// create the event, add it to user and save
		User user = getUser(uid);
		try {
			checkUserJoinedCommunity(uid, createForm.getCommunityId());
		}
		catch (ElementNotFound e) {
			throw new Forbidden("User cannot host an event in a community user did not join");
		}
		Event createdEvent = eventService.createEvent(createForm);
		user.hostEvent(createdEvent);
		userRepository.save(user);
		return createdEvent.getId();
	}

	/**
	 * Make user attend the event - create ATTENDING relationship between user and event
	 * @param uid is uid of user
	 * @param attendEventForm contains id of event
	 * @throws ElementNotFound if user or event do not exist
	 */
	@Override
	public void attendEvent(String uid, EventIdForm attendEventForm) {
		User user = getUser(uid);
		Event event = eventService.getEvent(attendEventForm.getEventId());
		user.attendEvent(event);
		userRepository.save(user, 1);
	}

	/**
	 * Make user unattend the event - remove ATTENDING relationship between user and event
	 * @param uid is uid of user
	 * @param eventIdForm contains id of event
	 * @throws ElementNotFound if user or event do not exist
	 */
	@Override
	public void unattendEvent(String uid, EventIdForm eventIdForm) {
		getUser(uid);
		eventService.getEvent(eventIdForm.getEventId());
		userRepository.unattendEvent(uid, eventIdForm.getEventId());
	}

	/**
	 * Make user cohost the event - create HOSTING relationship between user and event
	 * @param uid is uid of user
	 * @param cohostEventForm contains id of event
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden when User tries to create an event in a community user never joined
	 */
	@Override
	public void cohostEvent(String uid, EventIdForm cohostEventForm) {
		User user = getUser(uid);
		Event event = eventService.getEvent(cohostEventForm.getEventId());
		try {
			checkUserJoinedCommunity(uid, event.getCommunityId());
		}
		catch (ElementNotFound e) {
			throw new Forbidden("User cannot cohost an event in a community user did not join");
		}
		user.hostEvent(event);
		userRepository.save(user, 1);
	}

	/**
	 * Edits an event (user must be hosting it to be allowed to edit it)
	 * @param uid is uid of user
	 * @param editForm contains edit information of event
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden when none host user attempts to edit the event
	 * @throws InvalidRequestBody if end date of edited event is before start date
	 */
	@Override
	public void editEvent(String uid, EditDeleteForm editForm) {
		Event event = getEditableEvent(uid, editForm.getEventId());
		eventService.editEvent(event, editForm);
	}

	/**
	 * Deletes an event (user must be hosting it to be allowed to delete it)
	 * @param uid is uid of user
	 * @param deleteForm contains edit information of event
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden when none host user attempts to delete the event
	 */
	@Override
	public void deleteEvent(String uid, EditDeleteForm deleteForm) {
		getEditableEvent(uid, deleteForm.getEventId());
		eventService.deleteEvent(deleteForm.getEventId());
	}

	/**
	 * Sets a new theme image link
	 * @param uid of user who wants to set new theme image
	 * @param imageForm contains event id and link of new image
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden if user is not event host
	 */
	@Override
	public void setEventThemeImage(String uid, ImageForm imageForm) {
		Event event = getEditableEvent(uid, imageForm.getEventId());
		eventService.setEventThemeImage(event, imageForm.getLink());
	}

	/**
	 * Creates a new post in event
	 * @param uid of user who wants to create new post
	 * @param createForm contains event's id and title, description, image link of post
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden if user is not event host
	 */
	@Override
	public Long addEventPost(String uid, CreateFromEventForm createForm) {
		User user = getUser(uid);
		Event event = eventService.getEvent(createForm.getEventId());
		if (!user.hostsEvent(event)) {
			throw new Forbidden("User must be hosting event to be able to delete it");
		}
		Post createdPost =  postService.createPost(event, user, createForm.getDescription(),
				createForm.getImageLink());
		return createdPost.getId();
	}

	/**
	 * Edits a post
	 * @param uid of user who wants to edit the post
	 * @param editForm contains post's id, title, description, image link
	 * @throws ElementNotFound if user or post do not exist
	 * @throws Forbidden if user is not the one who posted the post
	 */
	@Override
	public void editPost(String uid, EditForm editForm) {
		User user = getUser(uid);
		postService.editPost(user, editForm.getPostId(), editForm.getDescription(),
				editForm.getImageLink());
	}

	/**
	 * Removes an image link from event list of image links
	 * @param uid of user who wants to set new theme image
	 * @param postIdForm contains post id
	 * @throws ElementNotFound if user or post do not exist
	 * @throws Forbidden if user is not the one who made the post
	 */
	@Override
	public void deletePost(String uid, PostIdForm postIdForm) {
		if (!isPostPoster(uid, postIdForm.getPostId())) {
			throw new Forbidden("Only user who posted this post can delete it");
		}
		postService.deletePost(postIdForm.getPostId());
	}

	/**
	 * Checks to see if user with given uid posted post with given postId
	 * @param uid of user
	 * @param postId of post
	 * @return true if user posted the post
	 * @throws ElementNotFound if user or post do not exist
	 */
	@Override
	public boolean isPostPoster(String uid, Long postId) {
		try {
			return userRepository.isPostPoster(uid, postId);
		} catch (AopInvocationException e) {
			throw new ElementNotFound("Post or user not found");
		}
	}


	/**
	 * Check if user joined community
	 * @param uid is uid of user
	 * @param cid is id of community
	 * @throws ElementNotFound User or Community or Relationship not found
	 */
	private void checkUserJoinedCommunity(String uid, Long cid) {
		// check if user and community exist
		communityService.findCommunity(cid, new ElementNotFound("Community not found"));
		getUser(uid);
		// check if user ever joined the community, if not throw exception
		if (!userRepository.alreadyJoined(uid, cid)) {
			throw new ElementNotFound("User never joined this community");
		}
	}

	/**
	 * Validates if user with given uid can edit the event with given id
	 * @param uid is user uid
	 * @param eventId is event id
	 * @return Event with given id if user hosts it
	 * @throws ElementNotFound if user or event do not exist
	 * @throws Forbidden if user cannot edit event (is not a host)
	 */
	private Event getEditableEvent(String uid, Long eventId) {
		User user = getUser(uid);
		Event event = eventService.getEvent(eventId);
		if (!user.hostsEvent(event)) {
			throw new Forbidden("User must be hosting event to be able to delete it");
		}
		return event;
	}

	/**
	 * Find user with given uid
	 * @param uid given uid
	 * @return User if present, null if no
	 */
	private User findUser(String uid) {
		return userRepository.findUser(uid);
	}
	
}
