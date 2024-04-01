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


### BES-2 (5 points, priority 3)

As a general user, I want to be able to see a list of communities that I can join so I can join ones that I am interested in.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* There must be a screen that shows all communities.
* Communities should be categorized using tree structure, no cyclic graphs, for example: Gaming -> RTS -> StarCraft 2
* For each community, there should be a join button.

### BES-3 (3 points, priority 4)

As a general user, I want to be able to join a community with a proficiency level so I can find events and groups that suits my preference.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* When I click on [Join Community] button, there must be a screen with all proficiency levels I can choose from.
* There must be at least 4 proficiency levels: Novice, Intermidiate, Expert, Professional.
* Each level should have a description, so users know which one to choose.

### BES-4 (2 points, priority 14)

As a general user, I want to be able to prevent some of my profile information to be shared publicly, so I can keep my identity private.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* After signup, all my personal information should be set to invisible by default.
* I should be able to choose if or not to share: My real name, email address and phone number.
* There must be a settings menu where all these options reside.

### BES-5 (8 points, priority 7)

As a general user, I want to be able to join a group chat in a community and send/receive messages so I can connect with my fellow fans.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* There must be a screen with a list of group chats that I can join.
* I must be able to join a group chat.
* I must be able to see all messages sent by group members in chronological order.
* I must be able to send a text message to the group chat.

### BES-6 (3 points, priority 8)

As a community moderator, I want to be able to mute certain users from the chat so I can keep the community safe for everyone.

Relevant Persona: Timothy, Tyler

Criteria of Satisfaction

* Moderators must be able to choose a user and mute them.
* Must be able to choose a time limit for the mute, must have at least: 30 min, 1 hr, and indefinite.
* Once a user is muted, the user should not be able to send any more messages in the chat.
* Once the time limit passes, the mute should expire.

### BES-7 (3 points, priority 2)

As a system administrator, I want to be able to create and remove communities from the system so I can keep the platform up-to-date with recent trends.

Relevant Persona: Timothy

Criteria of Satisfaction

* There must be a backend page where admin can login to view all communities.
* System admin can create a community within the system.
* System admin can remove a community within the system (doesn't have to be removed from the database, as long as it is hidden from users).

### BES-8 (5 points, priority 5)

As a general user, I want to be able to create my own private chat channel so I can send private messages and organize events/meetups.

Relevant Persona: Jessica, Tyler

Criteria of Satisfaction

* I must be able to search users by name/email to invite to the chat channel.
* Should be able to change the chat name.
* After a chat is created, the user who created it should become the moderator for that chat.

### BES-9 (5 points, priority 9)

As an event host, I want to be able to advertise and create events on the platform so I can get more attendees to my event.

Relevant Persona: Jessica

Criteria of Satisfaction

* There must be a contact form for event hosts to contact the administrator to advertise events.
* Administrator must be able to create an event and pin them to certain community pages.
    * For example: Anime North may be posted and pinned to Anime community home page.

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
    * List of pictures

### BES-11 (3 points, priority 15)

As a system administrator, I want to be able to remove events from the platform so I can make sure there are no spam events.

Relevant Persona: Tyler, Timothy

Criteria of Satisfaction

* On administrative dashboard, I should be able to see a list of events grouped by communities.
* I should be able to remove an event (doesn't have to remove from the db, just hidden is fine).

### BES-12 (13 points, priority 13)

As a general user, I want to see a feed of location-based events and recommended chats so I can discover them more easily and quickly.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* For each community there should a home feed page.
* Within the feed page, it should show a feed of events and chats based on GPS location:
    * Events close by
    * Public chats created by users in close proximity
* Private chats should not show up.

### BES-13 (5 points, priority 6)

As a general user, I want to be able to make my private group chat public so it can show up on community feed and other fans can join.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* I should be able to make my private group chat public.
* Other users should be able to join once the chat is public.
* Chat should be visible on the home feed page once it is public.

### BES-14 (3 points, priority 17)

As a professional fan (professional gamer/cosplayer), I want my profile to show a special PRO badge so other people can easily identify me as a professional.

Relevant Persona: Jessica

Criteria of Satisfaction

* There should be a contact form to contact the administrator to add me as a professional user.
* Once I am a professional user, there should be a [PRO] badge after my username in chats and on my profile page.

### BES-15 (3 points, priority 16)

As a general user, I want to be able to modify my profile information so other people can be more informed about who I am.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* User must be able to edit their nickname, real name and profile picture.
* When the profile page is opened, it must prefill with existing information.


### BES-16 (2 points, priority 11)

As a general user, I should be able to see a list of all group chats that I have joined so I can quickly get back to them.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* There must be a screen where user can see a list of all joined group chats.
* Once clicked on a link, it should lead me back to the chat screen.

### BES-17 (5 points, priority 12)

As a general user, I should get a notification when a new message is received from one of the groups that I have joined, so I can keep up with the updates.

Relevant Persona: Tyler, Jessica

Criteria of Satisfaction

* There should be a push notification when a new message is received.
* The chat channel should be highlighted if there is a new message.
