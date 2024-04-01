package ca.projectbes.chatmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception for attempting to do something without the correct privileges. Returns code 400.
 *
 * @author Donnie Siu
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)

public class InvalidAccessException extends RuntimeException {}