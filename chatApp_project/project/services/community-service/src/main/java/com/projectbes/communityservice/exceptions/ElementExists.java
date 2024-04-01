package com.projectbes.communityservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This is an exception that responds with 404 code when thrown
 * @author Minh Hoang Nguyen
 *
 */
@ResponseStatus(HttpStatus.CONFLICT)
public class ElementExists extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	public ElementExists() {
		super();
	};
	
	public ElementExists(String message) {
		super(message);
	}

}
