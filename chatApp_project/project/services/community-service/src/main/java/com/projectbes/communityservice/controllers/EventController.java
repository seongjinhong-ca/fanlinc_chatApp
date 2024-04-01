package com.projectbes.communityservice.controllers;

import com.projectbes.communityservice.models.Event;
import com.projectbes.communityservice.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * This is a REST controller for Event
 * @author Minh Hoang Nguyen
 *
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rest/fanlinc/events")
public class EventController {

	private EventService eventService;

	@Autowired
	public EventController(EventService eventService) {
		this.eventService = eventService;
	}

	/**
	 * Get request handler to get Event
	 * @param id - the id path variable of event
	 * @return Event with given id
	 */
	@GetMapping("/{id}")
	public Event getEvent(@PathVariable Long id) {
		return eventService.getEvent(id);
	}

}
