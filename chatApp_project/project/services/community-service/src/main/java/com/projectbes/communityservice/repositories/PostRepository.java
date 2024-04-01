package com.projectbes.communityservice.repositories;

import com.projectbes.communityservice.models.Post;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

/**
 * A repository for Post. Includes all the methods that would modify data
 * directly in Neo4j
 * @author Minh Hoang Nguyen
 *
 */
@Repository
public interface PostRepository extends Neo4jRepository<Post, Long> {
}
