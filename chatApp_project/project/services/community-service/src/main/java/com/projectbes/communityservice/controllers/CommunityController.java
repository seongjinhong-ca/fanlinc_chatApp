package com.projectbes.communityservice.controllers;

import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import com.projectbes.communityservice.dtos.communityDtos.SetImageForm;
import com.projectbes.communityservice.models.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projectbes.communityservice.dtos.communityDtos.CreateForm;
import com.projectbes.communityservice.dtos.communityDtos.EditForm;
import com.projectbes.communityservice.models.Community;
import com.projectbes.communityservice.services.CommunityService;


/**
 * This is a REST controller for community
 * @author Minh Hoang Nguyen
 *
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rest/fanlinc/communities")
public class CommunityController {

	private CommunityService communityService;

	@Autowired
	public CommunityController(CommunityService communityService) {
		this.communityService = communityService;
	}
	
	/**
	 * Post request handler: creates new community
	 * @param createForm is request body
	 * @return id of created community
	 */
	@PostMapping
	public Long createCommunity(@Valid @RequestBody CreateForm createForm) {
		return communityService.createCommunity(createForm);
	}

	/**
	 * Get request handler: gets communities as flat list
	 * @return list of root communities
	 */
	@GetMapping
	public List<Community> getCommunities() {
		return communityService.getCommunities();
	}

	/**
	 * Put request handler: edits a community (name or parent)
	 * @param id is the id of community to edit
	 * @param editForm is request body
	 */
	@PutMapping("/{id}")
	public void editCommunity(@PathVariable Long id, @Valid @RequestBody EditForm editForm) {
		communityService.editCommunity(id, editForm);
	}

	/**
	 * Remove parent community, making if a base community
	 * @param id is id of community
	 */
	@PutMapping("/{id}/removeParent")
	public void removeParent(@PathVariable Long id) {
		communityService.removeParent(id);
	}

	/**
	 * Delete request handler: removes a community (hides from users)
	 * @param id: community's id
	 */
	@DeleteMapping("/{id}")
	public void removeCommunity(@PathVariable Long id) {
		communityService.removeCommunity(id);
	}
	
	/**
	 * Get request handler with path variable {id}
	 * @param id - the id path variable
	 * @return community with given id
	 */
	@GetMapping("/{id}")
	public Community.Simple getCommunity(@PathVariable Long id) {
		return communityService.getCommunity(id);
	}

	/**
	 * Put request handler: set theme image
	 * @param id of community
	 * @param imageForm contains new image link
	 */
	@PutMapping("/{id}/setThemeImage")
	public void setThemeImage(@PathVariable Long id, @Valid @RequestBody
			SetImageForm imageForm) {
		communityService.setThemeImage(id, imageForm.getLink());
	}

	/**
	 * Get request handler: get all events of the community
	 * @param id is id of community
	 */
	@GetMapping("/{id}/getEvents")
	public Set<Event.Simple> getEvents(@PathVariable Long id) {
		return communityService.getEvents(id);
	}
}
