package com.projectbes.communityservice.services;

import com.projectbes.communityservice.dtos.seedDtos.SeedForm;

/**
 * This is interface that defines seed related services
 * @author William Song
 *
 */
public interface SeedService {

	/**
	 * Seeds communities from a file with the following format:
	 * A community without any parent is on a single line with just the name of the community
	 * A community with a parent is on a single line in a "parentCommunity:childCommunity" order
	 * NOTE: used for initializing empty database only
	 * @param form contains name of the file
	 */
	public void seedCommunity(SeedForm form);
}
