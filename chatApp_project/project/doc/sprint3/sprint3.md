# Sprint 3 Planning Meeting

## Participants

patel415, nguy1924, zhengj69, songwil3, siudonni, hongse10

## Sprint Goals

For this sprint, we want to complete all the features that were not implemented from the last sprint and also complete all remaining features pretatining to fanlinc.

* We want to connect and integrate all our microservices into our webpage.
* The front-end should be fully completed.
* The back-end should be fully completed.
* We should be able to run a demo of the application for the client.

## Old stories to be finished from sprint 2

* BES-3
As a general user, I want to be able to join a community with a proficiency level so I can find events and groups that suits my preference.
* BES-8
As a general user, I want to be able to create my own private chat channel so I can send private messages and organize events/meetups.

## New Stories to be done in sprint 3

### BES-4 As a general user, I want to be able to prevent some of my profile information to be shared publicly, so I can keep my identity private.

### BES-6 As a community moderator, I want to be able to mute certain users from the chat so I can keep the community safe for everyone.

### BES-9 As an event host, I want to be able to create, edit events with posts on the platform so I can get attendees to my event.

### BES-12 As a general user, I want to see a feed of location-based events and recommended chats so I can discover them more easily and quickly.

### BES-13 As a general user, I want to be able to make my private group chat public so it can show up on community feed and other fans can join.

### BES-14 As a professional fan (professional gamer/cosplayer), I want my profile to show a special PRO badge so other people can easily identify me as a professional.

### BES-16 As a general user, I should be able to see a list of all group chats that I have joined so I can quickly get back to them.

### BES-17 As a general user, I should get a notification when a new message is received from one of the groups that I have joined, so I can keep up with the updates.


## Task Distribution

### BES-4, 6, 9, 11, 12, 13, 14, 16, 17, listed below:


### BES-3 As a general user, I want to be able to join a community with a proficiency level so I can find events and groups that suit my preference.

* BES-29
Add new endpoint to allow users to add a community to their profile - Hoang
* BES-34
Create front-end page to allow users to join community - Hoang

### BES-4 As a general user, I want to be able to prevent some of my profile information to be shared publicly, so I can keep my identity private.

* BES-78
Implement endpoints in identity service to get public and all information of user - Smit
* BES-79
Implement front end to edit privacy setting - Smit

### BES-6 As a community moderator, I want to be able to mute certain users from the chat so I can keep the community safe for everyone.

* BES-63
Create an API to get a list of available roles - Chris
* BES-64
Create an API to add role to a user - Chris
* BES-65
Create an API to remove a role from a user - Chris
* BES-66
Integrate mute role with chat server - Chris
* BES-67
Implement feature to assign the mute role for a certain time period - Chris
* BES-68
Front-end add/remove roles from users - Chris

### BES-8 As a general user, I want to be able to create my own private chat channel so I can send private messages and organize events/meetups.
* BES-33
Write design document for the chat system - Don
* BES-36
Back-end for chat creation - Don
* BES-38
Backend for renaming chat - Don
* BES-39
Create front-end UI for private chat creation - Jun
* BES-50
back-end for Adding/Removing/Inviting user to chat - Don

### BES-9 As an event host, I want to be able to create, edit events with posts on the platform so I can get attendees to my event.

* BES-53	
Front end for Community. Includes events that are happening soon, button to create event, users joined, separated by proficiency level - Hoang

* BES-54	
Front end for Events. Includes all information of Event, theme image, and event posts. Can add cohosts, edit Event if you're a host, and attend or unattend Event if not a host - Hoang

* BES-55	
Backend for cohost, attend, unattend event. Update event info, posts, theme image - Hoang

* BES-56	
Backend Community: get users and their proficiency level, get events(dates, number of attendees,...) - Hoang

* BES-59	
Backend for Posts - Hoang

* BES-57	
Set up Amazon S3 bucket - Hoang

* BES-58	
Create service to remove, upload images to firebase - Smit

* BES-60	
Front end for Posts - Post gallery, post view - Hoang

### BES-13 As a general user, I want to be able to make my private group chat public so it can show up on community feed and other fans can join.

* BES-74	
API to change visibility of chat to private/public - Don

* BES-75	
API to associate a community with a chat - Don

* BES-76	
API to get a list of chats associated with a given community - Don

* BES-77	
Create basic community feed UI - Jun

### BES-14 As a professional fan (professional gamer/cosplayer), I want my profile to show a special PRO badge so other people can easily identify me as a professional.

* BES-69	
Create PRO parameters/definition - Will

* BES-70	
Create PRO graphic/designation - Will

* BES-71	
Implement PRO badge (frontend) - Jun

* BES-80
Implement PRO badge (database) - Will

### BES-16 As a general user, I should be able to see a list of all group chats that I have joined so I can quickly get back to them.

* BES-62	
Create an endpoint on chat management service to retrieve chats by user - Don	

* BES-72	
Create a sidebar with profile information - Jun

### BES-17 As a general user, I should get a notification when a new message is received from one of the groups that I have joined, so I can keep up with the updates.

* BES-61
Create basic REST API gateway to proxy RESTful requests - Jun
