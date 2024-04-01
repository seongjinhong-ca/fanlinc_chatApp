package com.projectbes.communityservice.dtos.postDtos;

import javax.validation.constraints.NotNull;

/**
 * Form for editing a post
 * @author Minh Hoang Nguyen
 *
 */
public class EditForm {
	@NotNull
	private Long postId;
	private String description;
	private String imageLink;

	public Long getPostId() {
		return postId;
	}

	public String getDescription() {
		return description;
	}

	public String getImageLink() {
		return imageLink;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}
}
