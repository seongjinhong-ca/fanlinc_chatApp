package com.projectbes.communityservice.dtos.userDtos;

import javax.validation.constraints.NotNull;

/**
 * Form for creating a new user
 * @author Minh Hoang Nguyen
 *
 */
public class CreateForm {
	@NotNull
	private String uid;
	
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}

}
