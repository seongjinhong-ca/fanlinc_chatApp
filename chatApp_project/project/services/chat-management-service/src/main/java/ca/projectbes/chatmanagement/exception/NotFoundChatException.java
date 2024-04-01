package ca.projectbes.chatmanagement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception for attempting to use a non-existent chat. Returns code 404.
 *
 * @author Donnie Siu
 */
@ResponseStatus(HttpStatus.NOT_FOUND)

public class NotFoundChatException extends RuntimeException {}