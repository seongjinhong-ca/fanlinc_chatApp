package com.projectbes.communityservice.services;

import com.projectbes.communityservice.dtos.eventDtos.CreateForm;
import com.projectbes.communityservice.dtos.communityDtos.EditForm;
import com.projectbes.communityservice.dtos.eventDtos.EditDeleteForm;
import com.projectbes.communityservice.dtos.eventDtos.ImageForm;
import com.projectbes.communityservice.exceptions.ElementNotFound;
import com.projectbes.communityservice.exceptions.Forbidden;
import com.projectbes.communityservice.exceptions.InvalidRequestBody;
import com.projectbes.communityservice.models.Community;
import com.projectbes.communityservice.models.Event;
import com.projectbes.communityservice.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

/**
 * This class includes implementation of all the event related services
 * @author Minh Hoang Nguyen
 *
 */
@Service
public class EventServiceImpl implements EventService {

	private EventRepository eventRepository;
	private CommunityService communityService;
	private PostService postService;

	@Autowired
	public EventServiceImpl(EventRepository eventRepository, CommunityService communityService,
							PostService postService) {
		this.eventRepository = eventRepository;
		this.communityService = communityService;
		this.postService = postService;
	}

	/**
	 * Creates a new event
	 * @param createForm contains information needed to create an event:
	 * @return newly created Event object
	 * @throws ElementNotFound when Community cannot be found
	 * @throws InvalidRequestBody if start and end date aren't of correct format
	 */
	@Override
	public Event createEvent(CreateForm createForm) {
		// get community
		Community community = communityService.findCommunity(createForm.getCommunityId(),
				new ElementNotFound("Community not found"));
		// check if end date is before start date, throw exception if so
		Date startDate = createForm.getStartDate();
		Date endDate = createForm.getEndDate();
		if (startDate.after(endDate)) {
			throw new InvalidRequestBody("End date time cannot be after start date time");
		}
		// create new event and return it
		Event event = new Event(community, createForm.getName(), createForm.getDescription(),
				createForm.getLocation(), startDate, endDate, createForm.getThemeImageLink());
		return eventRepository.save(event);
	}

	/**
	 * Edits the event
	 * @param event is event to edit
	 * @param editForm is the edit information of event (must include event id)
	 * @throws ElementNotFound if event to edit can't be found
	 * @throws InvalidRequestBody if end date of edited event is before start date
	 */
	@Override
	public void editEvent(Event event, EditDeleteForm editForm) {
		event.editEvent(editForm.getName(), editForm.getDescription(), editForm.getLocation(),
				editForm.getStartDate(), editForm.getEndDate(), editForm.getThemeImageLink());
		if (event.getStartDate().after(event.getEndDate())) {
			throw new InvalidRequestBody("End date time cannot be after start date time");
		}
		eventRepository.save(event);
	}

	/**
	 * Deletes an event with given id (deletes all event's posts first)
	 * @param id is id of event to be deleted
	 * @throws ElementNotFound if event not found
	 */
	@Override
	public void deleteEvent(Long id) {
		Event event = getEvent(id);
		postService.deleteAllPosts(event);
		eventRepository.delete(event);
	}

	/**
	 * Retrieve Event object from database given it's id
	 * @param id of Event to get
	 * @return Event object
	 * @throws ElementNotFound if event does not exist
	 */
	@Override
	public Event getEvent(Long id) {
		// find the event
		Optional<Event> eventOptional = eventRepository.findById(id, 2);
		// send rcode if community not found by given exception
		if (!eventOptional.isPresent()) {
			throw new ElementNotFound("Event not found");
		}
		return eventOptional.get();
	}

	/**
	 * Sets a new theme image link
	 * @param event is event to set theme image
	 * @param imageLink is link of new image
	 */
	@Override
	public void setEventThemeImage(Event event, String imageLink) {
		event.setThemeImage(imageLink);
		eventRepository.save(event);
	}

}
