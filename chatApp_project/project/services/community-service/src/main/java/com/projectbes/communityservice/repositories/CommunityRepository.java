package com.projectbes.communityservice.repositories;

import java.util.List;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.projectbes.communityservice.models.Community;

/**
 * A repository for Community. Includes all the methods that would modify data
 * directly in Neo4j
 * @author Minh Hoang Nguyen
 *
 */
@Repository
public interface CommunityRepository extends Neo4jRepository<Community, Long> {
	
	/**
	 * Get list of root communities' ids. A root community is a
	 * community with no parent community
	 */
	@Query("MATCH (c:Community) WHERE NOT ()-[:INCLUDES_COMMUNITY]->(c) RETURN id(c)")
	List<Long> findParentCommunitiesIds();

	/**
	 * Check if a community is descendant of another community (both communities exist)
	 * @param id: id of the other community
	 * @param descendantId: id of community to check if it's descendant
	 */
	@Query("MATCH p = (a:Community)-[:INCLUDES_COMMUNITY*]->(d:Community) " +
			"WHERE id(a)={id} and id(d)={descendantId} return count(p) > 0")
	boolean isDescendantCommunity(Long id, Long descendantId);
}
