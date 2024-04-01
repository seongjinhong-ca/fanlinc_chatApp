package com.projectbes.communityservice.repositories;

import org.springframework.aop.AopInvocationException;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import com.projectbes.communityservice.models.User;

/**
 * A repository for User. Includes all the methods that would modify data
 * directly in Neo4j
 * @author Minh Hoang Nguyen
 *
 */
@Repository
public interface UserRepository extends Neo4jRepository<User, Long> {
	
	/**
	 * Find user given uid
	 */
	@Query("MATCH (user:User {uid:{uid}}) RETURN user")
	User findUser(String uid);
	
	/**
	 * Finds if user with given uid already joined community with given cid.
	 * @throws AopInvocationException if user or community does not exist
	 */
	@Query("MATCH (u:User {uid:{uid}}), (c:Community) WHERE id(c) = {cid}" +
			"RETURN EXISTS( (u)-[:JOINED]->(c) )")
	boolean alreadyJoined(String uid, Long cid) throws AopInvocationException;

	/**
	 * Deletes relationship between user and community
	 * Throws exception if user or community do not exist
	 */
	@Query("MATCH (:User {uid:{uid}})-[j:JOINED]->(c:Community) WHERE id(c) = {cid} DELETE j")
	void leaveCommunity(String uid, Long cid);

	/**
	 * Edit proficiencyLevel property of relationship between user and community
	 * Throws exception if user or community does not exist
	 */
	@Query("MATCH (:User {uid:{uid}})-[j:JOINED]->(c:Community) WHERE id(c) = {cid} " +
			"SET j.proficiencyLevel = {proficiencyLevel}")
	void changeProficiencyLevel(String uid, Long cid, int proficiencyLevel);

	/**
	 * Deletes ATTENDING relationship between user and event
	 * Throws exception if user or event does not exist
	 */
	@Query("MATCH (:User {uid:{uid}})-[a:ATTENDING]->(e:Event) WHERE id(e) = {eid} DELETE a")
	void unattendEvent(String uid, Long eid);

	/**
	 * Finds if user with given uid already joined community with given cid.
	 * @throws AopInvocationException if user or post do not exist
	 */
	@Query("MATCH (u:User {uid:{uid}}), (p:Post) WHERE id(p) = {pid}" +
			"RETURN EXISTS( (u)-[:POSTED]->(p) )")
	boolean isPostPoster(String uid, Long pid) throws AopInvocationException;
}
