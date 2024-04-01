package com.projectbes.communityservice.models;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.typeconversion.DateLong;

import java.util.*;

/**
 * This is Post node entity. Represents the Post node in Neo4j
 * @author Minh Hoang Nguyen
 *
 */
@NodeEntity
public class Post {
	@Id @GeneratedValue
	private Long id;
	private String description;
	@DateLong
	private Date postedDate;
	private String imageLink;

	@Relationship(type="HAS_POST", direction=Relationship.INCOMING)
	private Event event;

	@Relationship(type="POSTED", direction=Relationship.INCOMING)
	private User user;

	public Post() {}

	public Post(String description, String imageLink) {
		this.description = description;
		this.imageLink = imageLink;
		this.postedDate = new Date();
	}

	public Long getId() {
		return id;
	}

	public String getDescription() {
		return description;
	}

	public Date getPostedDate() {
		return postedDate;
	}

	public String getImageLink() {
		return imageLink;
	}

	public String getUserUid() {
		return user == null ? null : user.getUid();
	}

	public boolean postedBy(User user) {
		return this.user == user;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setPostedDate(Date postedDate) {
		this.postedDate = postedDate;
	}

	public void setImageLink(String imageLink) {
		this.imageLink = imageLink;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public void setUser(User user) {
		this.user = user;
	}

	// Edits the basic information of Post if they are not null
	public void editPost(String description, String imageLink) {
		if (description != null) {
			setDescription(description);
		}
		if (imageLink != null) {
			setImageLink(imageLink);
		}
	}
}
