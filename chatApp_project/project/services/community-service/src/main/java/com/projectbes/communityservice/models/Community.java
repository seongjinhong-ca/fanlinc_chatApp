package com.projectbes.communityservice.models;

import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.*;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;

/**
 * This is Community node entity. Represents the Community node in Neo4j
 * @author Minh Hoang Nguyen
 *
 */
@NodeEntity
public class Community {
	@Id @GeneratedValue
	private Long id;
	private String name;
	private boolean removed;
	private String themeImage;
	
	@Relationship(type="INCLUDES_COMMUNITY")
	private Set<Community> subcommunities = new HashSet<>();
	
	@Relationship(type="INCLUDES_COMMUNITY", direction=Relationship.INCOMING)
	private Community parentCommunity;
	
	@Relationship(type="JOINED", direction=Relationship.INCOMING)
	private List<Joined> joinedUsers;

	@Relationship(type="HAS_EVENT")
	private List<Event> events = new ArrayList<>();

	public Community() {
		this.removed = false;
	}

	public Long getId() {
		return id;
	}

	public String getThemeImage() {
		return themeImage;
	}

	public String getName() {
		return name;
	}

	public boolean isRemoved() {
		return removed;
	}
	
	public Set<Community> getSubcommunities() {
		return subcommunities;
	}

	public List<Joined> getJoinedUsers() {
		return joinedUsers;
	}

	public Set<Event.Simple> getEvents() {
		return Event.getEventsSimple(events);
	}
	
	public Long obtainParentId() {
		return (parentCommunity == null) ? null : parentCommunity.id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setRemoved(boolean removed) {
		this.removed = removed;
	}
	
	public void setParentCommunity(Community parentCommunity) {
		this.parentCommunity = parentCommunity;
	}

	public void setThemeImage(String themeImage) {
		this.themeImage = themeImage;
	}

	/**
	 * Checks if all subcommunities were removed
	 * @return boolean that indicates the above
	 */
	public boolean canBeRemoved() {
		for (Community subCommunity : subcommunities) {
			if (!subCommunity.isRemoved()) {
				return false;
			}
		}
		return true;
	}

	public Simple retrieveSimpleCommunity() {
		return this.new Simple();
	}

	/**
	 * This class is a dto for Community, contains less information
	 */
	public class Simple {

		public Long getId() {
			return id;
		}

		public String getThemeImage() {
			return themeImage;
		}

		public String getName() {
			return name;
		}

		public boolean isRemoved() {
			return removed;
		}

		public int getNumberOfJoined() {
			return joinedUsers == null ? 0 : joinedUsers.size();
		}

		public Set<Event.Simple> getEvents() {
			return Event.getEventsSimple(events);
		}

		public List<Simple> getSubcommunities() {
			return getCommunitiesSimple(subcommunities);
		}
	}

	/**
	 * Get a set of simple communities : Communities with only important information
	 * @param communities is collection of Events
	 * @return set of simple communities
	 */
	public static List<Simple> getCommunitiesSimple(Collection<Community> communities) {
		List<Simple> communitiesSimple = null;
		if (communities != null) {
			communitiesSimple = new ArrayList<>();
			for (Community community : communities) {
				communitiesSimple.add(community.retrieveSimpleCommunity());
			}
		}
		return communitiesSimple;
	}

}
