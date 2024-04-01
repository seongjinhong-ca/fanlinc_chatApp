package com.projectbes.communityservice.dtos.eventDtos;

import javax.validation.constraints.NotNull;

/**
 * Form for creating a new community
 * @author Minh Hoang Nguyen
 *
 */
public class EventIdForm {
	@NotNull
	private Long eventId;

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}
}
