package com.projectbes.communityservice.services;

import com.projectbes.communityservice.exceptions.ElementNotFound;
import com.projectbes.communityservice.exceptions.Forbidden;
import com.projectbes.communityservice.models.Event;
import com.projectbes.communityservice.models.Post;
import com.projectbes.communityservice.models.User;
import com.projectbes.communityservice.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This class includes implementation of all the Post related services
 * @author Minh Hoang Nguyen
 *
 */
@Service
public class PostServiceImpl implements PostService {
    private PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }
    /**
     * Creates a new post in given event by given user
     * @param event       is given event
     * @param user        is given user
     * @param description is post description
     * @param link        is a image link
     * @return newly created post
     */
    @Override
    public Post createPost(Event event, User user, String description, String link) {
        Post post = new Post(description, link);
        post.setEvent(event);
        post.setUser(user);
        return postRepository.save(post);
    }

    /**
     * Edit a post
     * @param user user who wants to edit it
     * @param postId id of post to edit
     * @param description new description
     * @param link new image link
     * @throws Forbidden if user that wants to edit the post isn't the one who posted it
     */
    @Override
    public void editPost(User user, Long postId, String description, String link) {
        Post post = getPost(postId);
        if (!post.postedBy(user)) {
            throw new Forbidden("Only user who posted this post can edit it");
        }
        post.editPost(description, link);
        postRepository.save(post);
    }
    /**
     * Delete a post
     * @param postId id of post to delete
     * @throws ElementNotFound if post doesn't exist
     */
    @Override
    public void deletePost(Long postId) {
        postRepository.delete(getPost(postId));
    }

    /**
     * Get post with given id
     * @param postId id of post
     * @return found post
     * @throws ElementNotFound if post doesn't exist
     */
    @Override
    public Post getPost(Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        // send rcode if community not found by given exception
        if (!postOptional.isPresent()) {
            throw new ElementNotFound("Post not found");
        }
        return postOptional.get();
    }

    /**
     * Deletes all post in given event
     * @param event given event
     */
    @Override
    public void deleteAllPosts(Event event) {
        List<Post> eventPosts = event.getPosts();
        if (eventPosts != null) {
            for (Post post : eventPosts) {
                postRepository.delete(post);
            }
        }
    }

}
