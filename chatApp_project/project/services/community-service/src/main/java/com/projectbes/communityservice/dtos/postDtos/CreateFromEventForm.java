package com.projectbes.communityservice.dtos.postDtos;

import com.projectbes.communityservice.utils.Utils;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Form for creating a new post from event
 * @author Minh Hoang Nguyen
 *
 */
public class CreateFromEventForm {
	@NotNull
	private Long eventId;
	@NotNull
	private String description = "";
	private String imageLink;

	public String getDescription() {
		return description;
	}

	public Long getEventId() {
		return eventId;
	}

	public String getImageLink() {
		return imageLink;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}
}
