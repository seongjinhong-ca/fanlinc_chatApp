package com.projectbes.communityservice.services;

import java.util.List;
import java.util.Set;

import com.projectbes.communityservice.dtos.communityDtos.CreateForm;
import com.projectbes.communityservice.dtos.communityDtos.EditForm;
import com.projectbes.communityservice.exceptions.ElementNotFound;
import com.projectbes.communityservice.exceptions.Forbidden;
import com.projectbes.communityservice.exceptions.InvalidRequestBody;
import com.projectbes.communityservice.models.Community;
import com.projectbes.communityservice.models.Event;

/**
 * This is interface that defines all community related services
 * @author Minh Hoang Nguyen
 */
public interface CommunityService {

	/**
	 * Creates a new community
	 * @param createForm contains the name of new community and id of parent
	 * @return id of the newly created community
	 * @throws ElementNotFound when parent community cannot be found
	 */
	Long createCommunity(CreateForm createForm);

	/**
	 * Edits a community (name or parent community)
	 * @param editForm contains id of community to edit, name to update, parentId of new parent
	 * @throws ElementNotFound if community can't be found
	 * @throws InvalidRequestBody if parent cannot be found
	 * @throws Forbidden if tried to set a descendant community as a parent
	 */
	void editCommunity(Long id, EditForm editForm);

	/**
	 * Edit removed property of community to true, hiding it from users
	 * @param id: community's id
	 * @throws ElementNotFound if community to remove can't be found
	 * @throws Forbidden if subcommunities weren't removed first
	 */
	void removeCommunity(Long id);

	/**
	 * Get community's information in a tree structure
	 * @param id: community's id
	 * @return community object that includes it's id, name, removed boolean, and
	 * subcommunities recursively
	 * @throws ElementNotFound when community cannot be found
	 */
	Community.Simple getCommunity(Long id);

	/**
	 * Get all communities
	 * @return a list of communities
	 * Each community includes it's id, name, removed boolean, and theme image
	 */
	List<Community> getCommunities();

	/**
	 * Find community with default depth (1) - gets all immediate relations
	 * @param id is community id
	 * @param e is the exception that gets thrown (changing response code) if not
	 * community does not exist
	 * @return Community with given id
	 * @throws RuntimeException when community cannot be found
	 */
	Community findCommunity(Long id, RuntimeException e);

	/**
	 * Remove parent of community making it a base community
	 * @param id of the community
	 * @throws ElementNotFound if community to remove parent cannot be found
	 */
	void removeParent(Long id);

	/**
	 * Sets image of community with given id
	 * @param id of community
	 * @param link to set
	 * @throws ElementNotFound if community does not exist
	 */
	void setThemeImage(Long id, String link);

	/**
	 * Gets all events of given community
	 * @param communityId is id of community
	 * @return set of events in given community
	 */
	Set<Event.Simple> getEvents(Long communityId);
}
