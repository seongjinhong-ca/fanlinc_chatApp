package com.projectbes.communityservice.dtos.userDtos;

import javax.validation.constraints.NotNull;

/**
 * Form for that has community id
 * @author Minh Hoang Nguyen
 *
 */
public class CommunityIdForm {
	@NotNull
	private Long communityId;
	public Long getCommunityId() {
		return communityId;
	}
	public void setCommunityId(Long communityId) {
		this.communityId = communityId;
	}
}
