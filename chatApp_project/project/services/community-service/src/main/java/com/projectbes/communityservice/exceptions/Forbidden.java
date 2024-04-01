package com.projectbes.communityservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This is an exception that responds with 400 code when thrown
 * @author Minh Hoang Nguyen
 *
 */
@ResponseStatus(HttpStatus.FORBIDDEN)
public class Forbidden extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public Forbidden() {
		super();
	};

	public Forbidden(String message) {
		super(message);
	}
}
