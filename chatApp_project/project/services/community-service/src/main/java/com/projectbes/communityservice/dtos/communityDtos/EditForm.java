package com.projectbes.communityservice.dtos.communityDtos;

/**
 * Form for editing a community
 * @author Minh Hoang Nguyen
 *
 */
public class EditForm {
	private String name;
	private Long parentId;
	
	public String getName() {
		return name;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
}
