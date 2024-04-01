package com.projectbes.communityservice.models;

import java.util.Date;

import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;
import org.neo4j.ogm.annotation.typeconversion.DateLong;

/**
 * THis is a RelationshipEntity JOINED (user joined community)
 * @author Minh Hoang Nguyen
 *
 */
@RelationshipEntity(type = "JOINED")
public class Joined {
	
	@Id @GeneratedValue 
	private Long joinedId;
	@StartNode
	private User user;
	@EndNode
	private Community community;

	@DateLong
  	private Date joinedDate;
  	private int proficiencyLevel;
  
  	public Joined() {}

  	public Joined(User user, Community community, int profLevel) {
		this.user = user;
		this.community = community;
		this.proficiencyLevel = profLevel;
		this.joinedDate = new Date();
  	}

	public String getUid() {
  		return user.getUid();
	}

	public Long getCommunityId() {
		return community.getId();
	}

	public Date getJoinedDate() {
		return joinedDate;
	}

	public int getProficiencyLevel() {
		return proficiencyLevel;
	}

	public void setProficiencyLevel(int proficiencyLevel) {
		this.proficiencyLevel = proficiencyLevel;
	}
}
