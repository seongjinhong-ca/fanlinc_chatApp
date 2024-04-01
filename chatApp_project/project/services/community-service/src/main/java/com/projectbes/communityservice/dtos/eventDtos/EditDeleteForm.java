package com.projectbes.communityservice.dtos.eventDtos;

import com.projectbes.communityservice.utils.Utils;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Form for editing or deleting an event
 * @author Minh Hoang Nguyen
 *
 */
public class EditDeleteForm {
	@NotNull
	private Long eventId;
	private String name;
	private String description;
	private String location;
	private String startDate;
	private String endDate;
	private String themeImageLink;

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public String getLocation() {
		return location;
	}

	public Date getStartDate() {
		return startDate == null ? null :Utils.convertToDate(startDate);
	}

	public Date getEndDate() {
		return endDate == null ? null : Utils.convertToDate(endDate);
	}

	public Long getEventId() {
		return eventId;
	}

	public String getThemeImageLink() {
		return themeImageLink;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public void setThemeImageLink(String themeImageLink) {
		this.themeImageLink = themeImageLink;
	}
}
