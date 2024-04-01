package com.projectbes.communityservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * This is an exception that responds with 400 code when thrown
 * @author Minh Hoang Nguyen
 *
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidRequestBody extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public InvalidRequestBody() {
		super();
	};

	public InvalidRequestBody(String message) {
		super(message);
	}
}
