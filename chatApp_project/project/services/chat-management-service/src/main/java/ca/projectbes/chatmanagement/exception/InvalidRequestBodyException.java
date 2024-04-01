package ca.projectbes.chatmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception for invalid request bodies. Returns code 400.
 *
 * @author Donnie Siu
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)

public class InvalidRequestBodyException extends RuntimeException {}