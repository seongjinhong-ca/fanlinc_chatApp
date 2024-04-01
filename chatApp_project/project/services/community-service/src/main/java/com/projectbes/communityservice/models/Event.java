package com.projectbes.communityservice.models;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.typeconversion.DateLong;

import java.util.*;

/**
 * This is Community node entity. Represents the Community node in Neo4j
 * @author Minh Hoang Nguyen
 *
 */
@NodeEntity
public class Event {
	@Id @GeneratedValue
	private Long id;
	private String name;
	private String description;
	private String location;
	@DateLong
	private Date startDate;
	@DateLong
	private Date endDate;
	private String themeImage;

	@Relationship(type="HAS_EVENT", direction=Relationship.INCOMING)
	private Community community;

	@Relationship(type="HOSTING", direction=Relationship.INCOMING)
	private List<User> hostingUsers = new ArrayList<>();

	@Relationship(type="ATTENDING", direction=Relationship.INCOMING)
	private List<User> attendingUsers = new ArrayList<>();

	@Relationship(type="HAS_POST")
	private List<Post> posts = new ArrayList<>();

	public Event() {}

	public Event(Community community, String name, String description, String location,
				 Date startDate, Date endDate, String themeImage) {
		this.community = community;
		this.name = name;
		this.description = description;
		this.location = location;
		this.startDate = startDate;
		this.endDate = endDate;
		this.themeImage = themeImage;
	}

	public Long getId() {
		return id;
	}

	public Long getCommunityId() {
		return (community == null) ? null : community.getId();
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public String getLocation() {
		return location;
	}

	public Date getStartDate() {
		return startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public String getThemeImage() {
		return themeImage;
	}

	public List<String> getHostingUsers() {
		return retrieveUserUids(hostingUsers);
	}

	public List<String> getAttendingUsers() {
		return retrieveUserUids(attendingUsers);
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public void setCommunity(Community community) {
		this.community = community;
	}

	public void setThemeImage(String themeImage) {
		this.themeImage = themeImage;
	}

	public Simple retrieveSimpleEvent() {
		return this.new Simple();
	}

	/**
	 * Get list of user uids from list of users
	 * @param users is list of users
	 * @return list of user uids
	 */
	private List<String> retrieveUserUids(List<User> users) {
		List<String> userUids = null;
		if (users != null) {
			userUids = new ArrayList<>();
			for (User user : users) {
				userUids.add(user.getUid());
			}
		}
		return userUids;
	}

	// Edits the basic information of event if they are not null
	public void editEvent(String name, String description, String location, Date startDate,
						  Date endDate, String themeImage) {
		if (name != null) {
			setName(name);
		}
		if (description != null) {
			setDescription(description);
		}
		if (location != null) {
			setLocation(location);
		}
		if (startDate != null) {
			setStartDate(startDate);
		}
		if (endDate != null) {
			setEndDate(endDate);
		}
		if (themeImage != null) {
			setThemeImage(themeImage);
		}
	}

	/**
	 * This class is a dto for Event, contains only basic information (no relationships included)
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

		public String getDescription() {
			return description;
		}

		public String getLocation() {
			return location;
		}

		public Date getStartDate() {
			return startDate;
		}

		public Date getEndDate() {
			return endDate;
		}

		public int getNumberOfAttending() {
			return attendingUsers.size();
		}
	}

	/**
	 * Get a set of simple events : Events with only basic information
	 * @param events is collection of Events
	 * @return set of simple events
	 */
	public static Set<Simple> getEventsSimple(Collection<Event> events) {
		Set<Simple> eventsSimple = new HashSet<>();
		if (events != null) {
			for (Event event : events) {
				eventsSimple.add(event.retrieveSimpleEvent());
			}
		}
		return eventsSimple;
	}
}
