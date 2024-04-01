package com.projectbes.communityservice.services;

import java.lang.reflect.Constructor;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.projectbes.communityservice.exceptions.Forbidden;
import com.projectbes.communityservice.models.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectbes.communityservice.dtos.communityDtos.*;
import com.projectbes.communityservice.exceptions.ElementNotFound;
import com.projectbes.communityservice.exceptions.InvalidRequestBody;
import com.projectbes.communityservice.models.Community;
import com.projectbes.communityservice.repositories.CommunityRepository;

/**
 * This class includes implementation of all the community related services
 * @author Minh Hoang Nguyen
 *
 */
@Service
public class CommunityServiceImpl implements CommunityService {

	private CommunityRepository communityRepository;

	@Autowired
	public CommunityServiceImpl(CommunityRepository communityRepository) {
		this.communityRepository = communityRepository;
	}

	/**
	 * Creates a new community
	 * @param createForm contains the name of new community and id of parent
	 * @return id of the newly created community
	 * @throws ElementNotFound when parent community cannot be found
	 */
	public Long createCommunity(CreateForm createForm) {
		// create a odm community object with given name
		Community newCommunity = new Community();
		newCommunity.setName(createForm.getName());
		// if parentId is specified
		if (createForm.getParentId() != null) {
			// find the parent and set it
			Community parentCommunity = findCommunity(
					createForm.getParentId(), new ElementNotFound());
			newCommunity.setParentCommunity(parentCommunity);
		}
		// save to neo4j and return new id
		return communityRepository.save(newCommunity, 1).getId();
	}
	
	/**
	 * Edits a community (name or parent community)
	 * @param editForm contains id of community to edit, name to update, parentId of new parent
	 * @throws ElementNotFound if community can't be found
	 * @throws InvalidRequestBody if parent cannot be found
	 * @throws Forbidden if tried to set a descendant community as a parent
	 */
	public void editCommunity(Long id, EditForm editForm) {
		Community community = findCommunity(id, new ElementNotFound());
		if (editForm.getName() != null) {
			community.setName(editForm.getName());
		}
		if (editForm.getParentId() != null) {
			// find the parent and set it
			Community newParentCommunity = findCommunity(
					editForm.getParentId(), new InvalidRequestBody("Parent not found"));
			if (communityRepository.isDescendantCommunity(id, editForm.getParentId())) {
				throw new Forbidden("Cannot have descendant community as parent");
			}
			community.setParentCommunity(newParentCommunity);
		}
		// save in neo4j
		communityRepository.save(community, 1);
	}

	/**
	 * Remove parent of community making it a base community
	 * @param id of the community
	 * @throws ElementNotFound if community to remove parent cannot be found
	 */
	@Override
	public void removeParent(Long id) {
		Community community = findCommunity(id, new ElementNotFound());
		community.setParentCommunity(null);
		communityRepository.save(community);
	}

	/**
	 * Edit removed property of community to true, hiding it from users
	 * @param id: community's id
	 * @throws ElementNotFound if community to remove can't be found
	 * @throws Forbidden if subcommunities weren't removed first
	 */
	public void removeCommunity(Long id) {
		Community community = findCommunity(id, new ElementNotFound());
		if (!community.canBeRemoved()) {
			throw new Forbidden("Please remove subcommunities first");
		}
		community.setRemoved(true);
		communityRepository.save(community);
	}

	/**
	 * Get community's information in a tree structure
	 * @param id: community's id
	 * @return community object that includes it's id, name, removed boolean, events, and
	 * subcommunities
	 * @throws ElementNotFound when community cannot be found
	 */
	@Override
	public Community.Simple getCommunity(Long id) {
		return findCommunity(
				id, 2, new ElementNotFound("Community not found")).retrieveSimpleCommunity();
	}

	/**
	 * Get all communities
	 * @return a list of communities
	 * Each community includes it's id, name, removed boolean, and theme image
	 */
	@Override
	public List<Community> getCommunities() {
		return (List<Community>) communityRepository.findAll(0);
	}

	/**
	 * Sets image of community with given id
	 * @param id of community
	 * @param link to set
	 * @throws ElementNotFound if community does not exist
	 */
	@Override
	public void setThemeImage(Long id, String link) {
		Community community = findCommunity(id, new ElementNotFound("Community not found"));
		community.setThemeImage(link);
		communityRepository.save(community);
	}

	/**
	 * Gets all events of given community
	 * @param communityId is id of community
	 * @return set of events in given community
	 */
	@Override
	public Set<Event.Simple> getEvents(Long communityId) {
		Community.Simple community = getCommunity(communityId);
		return community.getEvents();
	}

	/**
	 * Helper method to find a community given id
	 * @param id is community id
	 * @param exception is the exception that gets thrown (changing response code)
	 * if not community does not exist
	 * @return Community with given id
	 * @throws RuntimeException when community cannot be found
	 */
	private Community findCommunity(Long id, int depth, RuntimeException exception) {
		// find the community
		Optional<Community> communityOptional = communityRepository.findById(id, depth);
		// send rcode if community not found by given exception
		if (!communityOptional.isPresent()) {
			throw exception;
		}
		return communityOptional.get();
	}
	
	/**
	 * Find community with default depth (1) - gets all immediate relations
	 * @param id is community id
	 * @param e is the exception that gets thrown (changing response code) if not
	 * community does not exist
	 * @return Community with given id
	 * @throws RuntimeException when community cannot be found
	 */
	public Community findCommunity(Long id, RuntimeException e) {
		return findCommunity(id, 1, e);
	}

	/**
	 * Find community information, and all it's relations' information recursively
	 */
	private Community findCommunityRecursive(Long id, RuntimeException e) {
		return findCommunity(id, -1, e);
	}
}
