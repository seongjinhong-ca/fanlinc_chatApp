package com.projectbes.communityservice.dtos.eventDtos;

import com.projectbes.communityservice.utils.Utils;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Form for creating a new event
 * @author Minh Hoang Nguyen
 *
 */
public class CreateForm {
	@NotNull
	private Long communityId;
	@NotNull
	private String name;
	@NotNull
	private String description;
	@NotNull
	private String location;
	@NotNull
	private String startDate;
	@NotNull
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
		return Utils.convertToDate(startDate);
	}

	public Date getEndDate() {
		return Utils.convertToDate(endDate);
	}

	public Long getCommunityId() {
		return communityId;
	}

	public String getThemeImageLink() {
		return  themeImageLink;
	}

	public void setCommunityId(Long communityId) {
		this.communityId = communityId;
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
