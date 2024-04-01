# Sprint 2 Planning Meeting

### Topics to discuss:
* Old features to be finished from sprint 1
* New features to be done for sprint 2
* Task distribution

### Participants

patel415, nguy1924, zhengj69, songwil3, siudonni, hongse10

### Sprint Goals

For this sprint, we want to complete features that were not implemented from the last sprint, and also complete some important new features.

* We want to have a fully functional chat feature so we can start testing with users.
* The backend for profile should be fully completed, and should have functional UI.
* Documentation should be refined to enable teammembers to deploy other's code easily.

### Old stories to be finished from sprint 1

* BES-2 As a general user, I want to be able to see a list of communities that I can join so I can join ones that I am interested in.
* BES-3 As a general user, I want to be able to join a community with a proficiency level so I can find events and groups that suit my preference.
* BES-8 As a general user, I want to be able to create my own private chat channel so I can send private messages and organize events/meetups.
* BES-7 As a system administrator, I want to be able to create and remove communities from the system so I can keep the platform up-to-date with recent trends.


### New stories to be done for sprint 2

See JIRA for task breakdowns

* BES-5 As a general user, I want to be able to join a group chat in a community and send/receive messages so I can connect with my fellow fans.
* BES-15 As a general user, I want to be able to modify my profile information so other people can be more informed about who I am.
* BES-10 As a general user, I want to be able to create small events on the platform so I can inform my fellow fans there is something going on.


### Task distribution

BES-2 As a general user, I want to be able to see a list of communities that I can join so I can join ones that I am interested in.

* BES-26 Write design document for profile service - *Will*
* BES-27 Add community service with ability to list all communities available in system - *Hoang*
* BES-28 Create seeding script to populate the database with example data - *Will*
* BES-30 Create UI component used to show a list of communities - *Will*

BES-3 As a general user, I want to be able to join a community with a proficiency level so I can find events and groups that suit my preference.

* BES-29 Add new endpoint to allow users to add a community to their profile - *Hoang*
* BES-34 Create front-end page to allow users to join community - *Chris*

BES-8 As a general user, I want to be able to create my own private chat channel so I can send private messages and organize events/meetups.

* BES-33 Write design document for the chat system - *Don*
* BES-36 Back-end For chat creation - *Don*
* BES-38 back-end for renaming chat - *Don*
* BES-39 Create front-end UI for private chat creation - *Don*
* BES-50 back-end for Adding/Removing/Inviting user to chat - *Don*

BES-7 As a system administrator, I want to be able to create and remove communities from the system so I can keep the platform up-to-date with recent trends.

* BES-31 Create a wireframe for administrative dashboard - *Will*
* BES-32 Modify profile service to allow adding/editing/removing communities - *Hoang*
* BES-35 Design a data model for service that includes community, event, profile services - *Hoang*
* BES-37 Create admin dashboard webpage - *Will*

BES-5 As a general user, I want to be able to join a group chat in a community and send/receive messages so I can connect with my fellow fans.

* BES-40 Create UI for chatrooms - *Jun*
* BES-41 Create Websocket chat server - *Jun*
* BES-43 Connect UI and Websocket API - *Jun*
* BES-42 Integrate chat server with management API - *Jun*

BES-15 As a general user, I want to be able to modify my profile information so other people can be more informed about who I am.

* BES-44 Modify identity service to allows profile modification - *Smit*
* BES-45 Create a profile page on the front end - *Smit*
* BES-46 Create endpoint to add, get profile picture (also uploading profile picture) - *Smit*

BES-10 As a general user, I want to be able to create small events on the platform so I can inform my fellow fans there is something going on.

* BES-47 Modify community-event service to allow creating, updating, deleting events - *Hoang*
* BES-48 Create UI for creating events - *Hoang*
* BES-49 Modify profile service to allow hosting, cohosting, attending events - *Hoang*
