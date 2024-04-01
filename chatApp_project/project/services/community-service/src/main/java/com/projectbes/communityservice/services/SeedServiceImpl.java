package com.projectbes.communityservice.services;

import com.projectbes.communityservice.dtos.communityDtos.CreateForm;
import com.projectbes.communityservice.dtos.seedDtos.SeedForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * This class includes implementation of all the seed related services
 * @author William Song
 * @author Minh Hoang Nguyen
 *
 */
@Service
public class SeedServiceImpl implements SeedService {

	private CommunityService communityService;

	@Autowired
	public SeedServiceImpl(CommunityService communityService) {
		this.communityService = communityService;
	}

	/**
	 * Seeds communities from a file with the following format:
	 * A community without any parent is on a single line with just the name of the community
	 * A community with a parent is on a single line in a "parentCommunity:childCommunity" order
	 * NOTE: used for initializing empty database only
	 * @param form contains name of the file
	 */
	public void seedCommunity(SeedForm form) {
		// A hashmap of names to ids as searching for parent communities is time inefficient
		Map<String, Long> namesToIds = new HashMap<>();
		// Open the file and iterate through the lines
		BufferedReader reader;
		try {
			reader = new BufferedReader(new FileReader(form.getFileName()));
			String line = reader.readLine();
			while (line != null) {
				CreateForm createForm = new CreateForm();
				String newCommunityName;
				if (line.contains(":")) { // parent child
					String[] names = line.split(":");
					newCommunityName = names[1];
					createForm.setParentId(namesToIds.get(names[0]));
				} else {
					newCommunityName = line;
				}
				createForm.setName(newCommunityName);
				namesToIds.put(newCommunityName, communityService.createCommunity(createForm));
				// read next line
				line = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
