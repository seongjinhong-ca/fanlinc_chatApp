# Product Backlog

## Numerical Series

We will use the Fibonacci series to estimate user stories:

1, 2, 3, 5, 8, 13

## User Stories

### BES-1 (5 points, priority 1)

As a general user, I want to be able to sign up using my email address so I can start using the application.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* Email address is verified before creating an account.
* Should prompt to enter a username during the process.
* Automatically logs user in after account creation.
* Two users can not have the same email address or username.


#### Sub-Tasks

* BES-18
Create front-end for signup page 
* BES-19
Create front-end for login page
* BES-20
Create service to send validation email to an email address
* BES-21
Implement identity service at the backend
* BES-22
Implement authorization service on the back-end
* BES-23
Integrate signup flow
* BES-24
Integrate login flow
* BES-25
Write design document for identity service

### BES-2 (5 points, priority 3)

As a general user, I want to be able to see a list of communities that I can join so I can join ones that I am interested in.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* There must be a screen that shows all communities.
* Communities should be categorized using tree structure, no cyclic graphs, for example: Gaming -> RTS -> StarCraft 2
* For each community, there should be a join button.

#### Sub-Tasks

* BES-26 Write design document for profile service
* BES-27 Add community service with ability to list all communities available in system
* BES-28 Create seeding script to populate the database with example data
* BES-30 Create UI component used to show a list of communities

### BES-3 (3 points, priority 4)

As a general user, I want to be able to join a community with a proficiency level so I can find events and groups that suits my preference.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* When I click on [Join Community] button, there must be a screen with all proficiency levels I can choose from.
* There must be at least 4 proficiency levels: Novice, Intermidiate, Expert, Professional.
* Each level should have a description, so users know which one to choose.

#### Sub-Tasks

* BES-29 Add new endpoint to allow users to add a community to their profile
* BES-34 Create front-end page to allow users to join community

### BES-4 (2 points, priority 14)

As a general user, I want to be able to prevent some of my profile information to be shared publicly, so I can keep my identity private.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* After signup, all my personal information should be set to invisible by default.
* I should be able to choose if or not to share: My real name, email address and phone number.
* There must be a settings menu where all these options reside.

#### Sub-Tasks
* BES-78
Implement endpoints in identity service to get public and all information of user
* BES-79
Implement front end to edit privacy setting

### BES-5 (8 points, priority 7)

As a general user, I want to be able to join a group chat in a community and send/receive messages so I can connect with my fellow fans.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* There must be a screen with a list of group chats that I can join.
* I must be able to join a group chat.
* I must be able to see all messages sent by group members in chronological order.
* I must be able to send a text message to the group chat.

#### Sub-Tasks

* BES-40 Create UI for chatrooms
* BES-41 Create Websocket chat server
* BES-43 Connect UI and Websocket API
* BES-42 Integrate chat server with management API

### BES-6 (3 points, priority 8)

As a community moderator, I want to be able to mute certain users from the chat so I can keep the community safe for everyone.

Relevant Persona: Timothy, Tyler

Criteria of Satisfaction

* Moderators must be able to choose a user and mute them.
* Must be able to choose a time limit for the mute, must have at least: 30 min, 1 hr, and indefinite.
* Once a user is muted, the user should not be able to send any more messages in the chat.
* Once the time limit passes, the mute should expire.

#### Sub-Tasks
* BES-63
Create an API to get a list of available roles
* BES-64
Create an API to add role to a user
* BES-65
Create an API to remove a role from a user
* BES-66
Integrate mute role with chat server
* BES-67
Implement feature to assign the mute role for a certain time period
* BES-68
Front-end add/remove roles from users

### BES-7 (5 points, priority 2)

As a system administrator, I want to be able to create and remove communities from the system so I can keep the platform up-to-date with recent trends.

Relevant Persona: Timothy

Criteria of Satisfaction

* There must be a backend page where admin can login to view all communities.
* System admin can create a community within the system.
* System admin can remove a community within the system (doesn't have to be removed from the database, as long as it is hidden from users).

#### Sub-Tasks

* BES-31 Create a wireframe for administrative dashboard
* BES-32 Modify profile service to allow adding/editing/removing communities
* BES-35 Design a data model for service that includes community, event, profile services
* BES-37 Create admin dashboard webpage

### BES-8 (5 points, priority 5)

As a general user, I want to be able to create my own private chat channel so I can send private messages and organize events/meetups.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* I must be able to search users by name/email to invite to the chat channel.
* Should be able to change the chat name.
* After a chat is created, the user who created it should become the moderator for that chat.

#### Sub-Tasks

* BES-33 Write design document for the chat system
* BES-36 Back-end For chat creation
* BES-38 back-end for renaming chat
* BES-39 Create front-end UI for private chat creation
* BES-50 back-end for Adding/Removing/Inviting user to chat

### BES-9 (8 points, priority 9)

As an event host, I want to be able to create, edit events with posts on the platform so I can get attendees to my event.

Relevant Persona: Jessica

Criteria of Satisfaction
* Hosts must be able to add other users as cohost
* Hosts must be able edit basic information of the event, and add or remove posts(with images or videos) to the event 
* Users should be able to view events of a community (sorted by number of attendees)
* Users must be able to attend and "unattend" the events

#### Sub-Tasks

* BES-53	
Front end for Community. Includes events that are happening soon, button to create event, users joined, separated by proficiency level
* BES-54	
Front end for Events. Includes all information of Event, theme image, and event posts. Can add cohosts, edit Event if you're a host, and attend or unattend Event if not a host
* BES-55	
Backend for cohost, attend, unattend event. Update event info, posts, theme image
* BES-56	
Backend Community: get users and their proficiency level, get events(dates, number of attendees,...)
* BES-59	
Backend for Posts
* BES-57	
Set up Amazon S3 bucket
* BES-58	
Create service to remove, upload images to firebase
* BES-60	
Front end for Posts - Post gallery, post view

### BES-10 (5 points, priority 10)

As a general user, I want to be able to create small events on the platform so I can inform my fellow fans there is something going on.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* I must be able to create an event with the following information
    * Community to post on
    * Location
    * Date/time
    * Name
    * Description

#### Sub-Tasks

* BES-47 Modify community-event service to allow creating, updating, deleting events
* BES-48 Create UI for creating events
* BES-49 Modify profile service to allow hosting, cohosting, attending events

### BES-13 (5 points, priority 6)

As a general user, I want to be able to make my private group chat public so it can show up on community feed and other fans can join.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* I should be able to make my private group chat public.
* Other users should be able to join once the chat is public.
* Chat should be visible on the home feed page once it is public.

#### Sub-Tasks

* BES-74	
API to change visibility of chat to private/public
* BES-75	
API to associate a community with a chat
* BES-76	
API to get a list of chats associated with a given community
* BES-77	
Create basic community feed UI 

### BES-14 (3 points, priority 17)

As a professional fan (professional gamer/cosplayer), I want my profile to show a special PRO badge so other people can easily identify me as a professional.

Relevant Persona: Jessica

Criteria of Satisfaction

* There should be a contact form to contact the administrator to add me as a professional user.
* Once I am a professional user, there should be a [PRO] badge after my username in chats and on my profile page.

#### Sub-Tasks

* BES-69	
Create PRO parameters/definition
* BES-70	
Create PRO graphic/designation
* BES-71	
Implement PRO badge (frontend)
* BES-80
Implement PRO badge (database)

### BES-15 (3 points, priority 16)

As a general user, I want to be able to modify my profile information so other people can be more informed about who I am.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* User must be able to edit their nickname, real name and profile picture.
* When the profile page is opened, it must prefill with existing information.

#### Sub-Tasks

* BES-44 Modify identity service to allows profile modification
* BES-45 Create a profile page on the front end
* BES-46 Create endpoint to add, get profile picture (also uploading profile picture)


### BES-16 (2 points, priority 11)

As a general user, I should be able to see a list of all group chats that I have joined so I can quickly get back to them.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* There must be a screen where user can see a list of all joined group chats.
* Once clicked on a link, it should lead me back to the chat screen.

#### Sub-Tasks

* BES-62	
Create an endpoint on chat management service to retrieve chats by user
* BES-72	
Create a sidebar with profile information

### BES-17 (5 points, priority 12)

As a general user, I should get a notification when a new message is received from one of the groups that I have joined, so I can keep up with the updates.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* There should be a push notification when a new message is received.
* The chat channel should be highlighted if there is a new message.

#### Sub-Tasks

* BES-61
Create basic REST API gateway to proxy RESTful requests
