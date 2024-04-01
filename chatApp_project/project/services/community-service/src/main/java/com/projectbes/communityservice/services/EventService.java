package com.projectbes.communityservice.services;

import com.projectbes.communityservice.dtos.eventDtos.CreateForm;
import com.projectbes.communityservice.dtos.eventDtos.EditDeleteForm;
import com.projectbes.communityservice.dtos.eventDtos.ImageForm;
import com.projectbes.communityservice.models.Event;
import com.projectbes.communityservice.exceptions.ElementNotFound;

/**
 * This is interface that defines all event related services
 * @author Minh Hoang Nguyen
 */
public interface EventService {

    /**
     * Creates a new event
     * @param createForm contains information needed to create an event: id of community, name and
     * location of event, start date and end date
     * @return newly created Event object
     */
    Event createEvent(CreateForm createForm);

    /**
     * Edits the event
     * @param editForm is the edit information of event (must include event id)
     * @throws ElementNotFound if event to edit can't be found
     */
    void editEvent(Event event, EditDeleteForm editForm);

    /**
     * Deletes an event with given id
     * @param id is id of event to be deleted
     * @throws ElementNotFound if event does not exist
     */
    void deleteEvent(Long id);

    /**
     * Retrieve Event object from database given it's id
     * @param id of Event to get
     * @return Event object
     * @throws ElementNotFound if event does not exist
     */
    Event getEvent(Long id);

    /**
     * Sets a new theme image link
     * @param event is event to set theme image
     * @param imageLink is link of new image
     */
    void setEventThemeImage(Event event, String imageLink);

}
