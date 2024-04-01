package com.projectbes.communityservice.dtos.communityDtos;

import javax.validation.constraints.NotNull;

/**
 * Form for creating a new community
 * @author Minh Hoang Nguyen
 *
 */
public class CreateForm {
	@NotNull
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
