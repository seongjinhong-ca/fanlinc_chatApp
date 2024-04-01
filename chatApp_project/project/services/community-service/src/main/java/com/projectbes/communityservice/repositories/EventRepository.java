package com.projectbes.communityservice.repositories;

import com.projectbes.communityservice.models.Event;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * A repository for Event. Includes all the methods that would modify data
 * directly in Neo4j
 * @author Minh Hoang Nguyen
 *
 */
@Repository
public interface EventRepository extends Neo4jRepository<Event, Long> {
}
