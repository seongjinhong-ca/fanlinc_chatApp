package com.projectbes.communityservice.dtos.seedDtos;

import javax.validation.constraints.NotNull;

/**
 * Form for creating a new community
 * @author William Song
 *
 */
public class SeedForm {
	@NotNull
	private String fileName;

	public String getFileName() {
		return fileName;
	}
	public void setName(String fileName) {
		this.fileName = fileName;
	}

	
}
