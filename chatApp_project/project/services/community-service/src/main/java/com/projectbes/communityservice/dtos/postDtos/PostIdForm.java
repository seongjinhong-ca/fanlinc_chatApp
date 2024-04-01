package com.projectbes.communityservice.dtos.postDtos;

import javax.validation.constraints.NotNull;

/**
 * Form for deleting a post
 * @author Minh Hoang Nguyen
 *
 */
public class PostIdForm {
	@NotNull
	private Long postId;

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

}
