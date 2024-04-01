package com.projectbes.communityservice.controllers;

import com.projectbes.communityservice.dtos.seedDtos.SeedForm;
import com.projectbes.communityservice.services.SeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


/**
 * This is a REST controller for community
 * @author William Song
 *
 */
@RestController
@RequestMapping("/rest/fanlinc/seed")
public class SeedController {

	private SeedService seedService;

	@Autowired
	public SeedController(SeedService seedService) {
		this.seedService = seedService;
	}

	/**
	 * Post request handler: seeds from a file
	 * @param seedForm is request body
	 */
	@PostMapping
	public void createCommunity(
			@Valid @RequestBody SeedForm seedForm) {
		seedService.seedCommunity(seedForm);
	}


}
