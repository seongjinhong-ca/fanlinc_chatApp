package ca.projectbes.chatmanagement.repository;

import ca.projectbes.chatmanagement.exception.NotFoundDatabaseException;
import ca.projectbes.chatmanagement.model.*;
import com.mongodb.client.*;
import com.mongodb.Block;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.ClassModel;
import org.bson.codecs.pojo.PojoCodecProvider;
import com.google.gson.Gson;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.gt;
import static com.mongodb.client.model.Filters.not;
import static com.mongodb.client.model.Updates.combine;
import static com.mongodb.client.model.Updates.set;
import static java.util.Arrays.asList;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;


/**
 * Performs CRUD operations on a database. Encapsulates which database is being utilized.
 *
 * @author Donnie Siu
 */
public class ChatManagementDAO implements AutoCloseable{
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private String defaultDatabase;
    private static ChatManagementDAO DAO;

    /**
     * Get an instance of the singleton class used to CRUD the database.
     *
     * @return ChatManagementDAO object
     */
    public static ChatManagementDAO getDAO() {
        if (ChatManagementDAO.DAO == null) {
            ChatManagementDAO.DAO = new ChatManagementDAO();
        }

        return ChatManagementDAO.DAO;
    }

    // Constructor.
    private ChatManagementDAO() {
        // Create a driver
        this.mongoClient = MongoClients.create();

        // Register the POJO models so that they can be serializable/deserializable.
        PojoCodecProvider pojoCodecProvider = registerModels();

        // Build the codec registry to allow insertion of POJOs in mongoDB.
        CodecRegistry pojoCodecRegistry = fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
                fromProviders(pojoCodecProvider));

        // Get the database name.
        try {
            String rootPath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
            String appConfigPath = rootPath + "application.properties";
            Properties appProps = new Properties();
            appProps.load(new FileInputStream(appConfigPath));
            this.defaultDatabase = appProps.getProperty("DBName");
        } catch (Exception e ) {
            throw new NotFoundDatabaseException();
        }

        // Get the database
        this.mongoDatabase = mongoClient.getDatabase(defaultDatabase).withCodecRegistry(pojoCodecRegistry);
    }

    /**
     * Register the POJO models so that they can be serializable/deserializable.
     *
     * @return A PojoCodecProvider with the registered models.
     */
    private PojoCodecProvider registerModels() {
        ClassModel<ChatModel> chatModel = ClassModel.builder(ChatModel.class).enableDiscriminator(true).build();
        ClassModel<ChatUserModel> chatUserModel = ClassModel.builder(ChatUserModel.class).
                enableDiscriminator(true).build();
        ClassModel<UserModel> userModel = ClassModel.builder(UserModel.class).enableDiscriminator(true).build();
        ClassModel<UserChatModel> userChatModel = ClassModel.builder(UserChatModel.class).enableDiscriminator(true)
                .build();
        ClassModel<ChatRoleModel> chatRoleModel = ClassModel.builder(ChatRoleModel.class).
                enableDiscriminator(true).build();

        return PojoCodecProvider.builder().register(chatModel, chatUserModel, userModel, userChatModel, chatRoleModel)
                .build();
    }

    /**
     * Converts a plain old java object to JSON and adds it to the database under the given collection name.
     *
     * @param collectionName: The name of the collection that is going to have the pojo inserted into.
     * @param pojoInstance: a plain old java class.
     */
    @SuppressWarnings("unchecked") // Type cast to object is valid since all classes extend Object.
    public void createCollection(String collectionName, Object pojoInstance) {
        MongoCollection<Object> collection = mongoDatabase.getCollection(collectionName,
                (Class<Object>) pojoInstance.getClass());
        collection.insertOne(pojoInstance);
    }

    public void deleteCollection() {
    }

    /**
     * Updates the oldPojoInstance to the newPojoInstance.
     *
     * @param collectionName The name of the collection that will have the update be performed upon.
     * @param oldPojoInstance The unique details/characteristics of the existing object to be updated.
     * @param newPojoInstance The new object that will replace the old one.
     */
    @SuppressWarnings("unchecked") // Type cast to object is valid since all classes extend Object.
    public void updateCollection(String collectionName, Object oldPojoInstance, Object newPojoInstance) {
        Gson gson = new Gson();
        MongoCollection<Object> collection = mongoDatabase.getCollection(collectionName,
                (Class<Object>) oldPojoInstance.getClass());
        Document oldDocument = Document.parse(gson.toJson(oldPojoInstance));
        collection.replaceOne(oldDocument, newPojoInstance);
    }

    /**
     * Returns all the objects under a given collection.
     *
     * @param collectionName The name of the collection that will be searched upon.
     * @param pojoInstance A plain old java object to indicate the POJO:MongoDocument mapping.
     */
    @SuppressWarnings("unchecked") // Type cast to object is valid since all classes extend Object.
    public ArrayList<Object> getCollection(String collectionName, Object pojoInstance) {
        MongoCollection<Object> collection = mongoDatabase.getCollection(collectionName,
                (Class<Object>) pojoInstance.getClass());
        return collection.find().into(new ArrayList<>());
    }


    /**
     * Returns all the objects under a given collection that satisfies a given property/pattern.
     *
     * @param collectionName The name of the collection that will be searched upon.
     * @param pojoInstance A plain old java object that contains the attributes that the resulting documents must
     *                     have.
     */
    @SuppressWarnings("unchecked") // Type cast to object is valid since all classes extend Object.
    public ArrayList<Object> searchCollection(String collectionName, Object pojoInstance) {
        Gson gson = new Gson();
        MongoCollection<Object> collection = mongoDatabase.getCollection(collectionName,
                (Class<Object>) pojoInstance.getClass());
        Document document = Document.parse(gson.toJson(pojoInstance));
        return collection.find(document).into(new ArrayList<>());
    }

    @Override
    public void close() {
        mongoClient.close();
    }
}