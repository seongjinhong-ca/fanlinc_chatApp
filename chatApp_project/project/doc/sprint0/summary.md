# Summary

The objective of this project is to build a social platform that allows different types of fans to discover local groups more easily. It will mainly provide services for them to create group chats and organize/advertise events.

There are three key types of users within our system:

* Professionals - This can be professional cosplayers, voice casts, game developers, etc.
* General Fans - This is our main userbase, usually young, should be around 18 to 30 years old.
* Administrators and Moderators - These are people who keep the system running, and will be using our administrative tools.

We have personas for each type of user, you can find them in Personas.pdf

There are many scenarios for our application, here we will list three for the three types of users listed above.
* Jessica is an amateur cosplayer, and she wants to meet people that are interested in cosplaying as well. She just moved to a new city for college so she doesn't have many friends. She also want to host photo shoot sessions occasionally in her local area.
* Tyler is a professional gamer, he is known for playing video games competitively. He usually hosts large gaming events and is very active in the community. Recently he is in charge of a local LAN party event in Springfield and he needs to really advertise the event for the venue to reach full capacity.
* Timothy is an administrator who modetrates the system-made chats. Recently he has spotted some spam messages within the chat that have caused many fans to leave. He needs to ban the spammer and keep the community safe.

There are some key priciples that we need to be aware of:
* Automation over Accuracy: As long as the information can be inferred from some external source (GPS location, phonebook, interaction history), we should always refrain from asking for confirmation or asking for manual input, even if it means the information may not be accurate.
* Location is Key: The whole goal of the system is to make local communities more discoverable. Therefore, most if not all contents should be location based.
