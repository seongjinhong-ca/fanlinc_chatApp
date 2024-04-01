package com.projectbes.communityservice.models;

import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;

/**
 * This is User node entity. Represents the User node in Neo4j
 * @author Minh Hoang Nguyen
 *
 */
@NodeEntity
public class User {
	@Id @GeneratedValue
	private Long id;
	private String uid;
	
	@Relationship(type="JOINED")
	private List<Joined> joinedCommunities = new ArrayList<>();

	@Relationship(type="HOSTING")
	private List<Event> hostingEvents = new ArrayList<>();

	@Relationship(type="ATTENDING")
	private List<Event> attendingEvents = new ArrayList<>();

	@Relationship(type="POSTED")
	private List<Post> posts;
	
	public User(String uid) {
		this.uid = uid;
	}

	public Long getId() {
		return id;
	}

	public String getUid() {
		return uid;
	}

	public List<Joined> getJoinedCommunities() {
		return joinedCommunities;
	}

	public Set<Event.Simple> getHostingEvents() {
		return Event.getEventsSimple(hostingEvents);
	}

	public Set<Event.Simple> getAttendingEvents() {
		return Event.getEventsSimple(attendingEvents);
	}

	// add a community to set of communities
	public void joinCommunity(Joined joinedRelationship) {
		joinedCommunities.add(joinedRelationship);
	}

	// add an event to set of hosting events
	public void hostEvent(Event event) {
		hostingEvents.add(event);
	}

	// add an event to list of attending events
	public void attendEvent(Event event) {
		attendingEvents.add(event);
	}

	/**
	 * Check to see if user hosts given event
	 * @param event is Event object
	 * @return boolean that indicates if user is hosting the event
	 */
	public boolean hostsEvent(Event event) {
		boolean result = false;
		if (hostingEvents != null) {
			result = hostingEvents.contains(event);
		}
		return result;
	}

}
