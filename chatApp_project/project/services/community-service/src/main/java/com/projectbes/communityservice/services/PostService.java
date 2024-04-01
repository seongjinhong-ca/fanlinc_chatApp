package com.projectbes.communityservice.services;

import com.projectbes.communityservice.exceptions.Forbidden;
import com.projectbes.communityservice.models.Event;
import com.projectbes.communityservice.models.Post;
import com.projectbes.communityservice.models.User;
import com.projectbes.communityservice.exceptions.ElementNotFound;

/**
 * This is interface that defines all Post related services
 * @author Minh Hoang Nguyen
 */
public interface PostService {

    /**
     * Creates a new post in given event by given user
     * @param event is given event
     * @param user is given user
     * @param title is title of post
     * @param description is post description
     * @param imageLink is a image link
     * @return newly created post
     */
    Post createPost(Event event, User user, String description, String imageLink);

    /**
     * Edit a post
     * @param user user who wants to edit it
     * @param postId id of post to edit
     * @param description new description
     * @param link new image link
     * @throws Forbidden if user that wants to edit the post isn't the one who posted it
     */
    void editPost(User user, Long postId, String description, String link);

    /**
     * Delete a post
     * @param postId id of post to delete
     * @throws ElementNotFound if post doesn't exist
     */
    void deletePost(Long postId);

    /**
     * Get post with given id
     * @param postId id of post
     * @return found post
     * @throws ElementNotFound if post doesn't exist
     */
    Post getPost(Long postId);

    /**
     * Deletes all post in given event
     * @param event given event
     */
    void deleteAllPosts(Event event);
}
