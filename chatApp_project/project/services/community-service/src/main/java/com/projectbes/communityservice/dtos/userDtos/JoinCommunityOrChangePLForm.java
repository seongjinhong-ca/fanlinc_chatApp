package com.projectbes.communityservice.dtos.userDtos;

import javax.validation.constraints.NotNull;

/**
 * Form for creating a new community
 * @author Minh Hoang Nguyen
 *
 */
public class JoinCommunityOrChangePLForm {
	@NotNull
	private Long communityId;
	@NotNull
	private Integer proficiencyLevel;
	public Long getCommunityId() {
		return communityId;
	}
	public int getProficiencyLevel() {
		return proficiencyLevel;
	}
	public void setCommunityId(Long communityId) {
		this.communityId = communityId;
	}
	public void setProficiencyLevel(int proficiencyLevel) {
		this.proficiencyLevel = proficiencyLevel;
	}

}
