# API Endpoints

**Note:** The  `~` in the endpoint represents the base URL of the service. This is `localhost:PORT` if the service is deployed on a local machine.

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/chat` \
**Method:** `PUT`

**Description:** Creates a new private chat with a user as a moderator. \
**Sample body:** 
```json 
{
    "chatName": "Gaming",
    "userId": "12345"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/chat` \
**Method:** `GET`

**Description:** Get the chat details for a given chat. \
**Sample body:** 
```json 
{
    "chatId": "1"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/all_chats` \
**Method:** `GET`

**Description:** Get the chat details for all chats. \
**Sample body:** `No Request Body`

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/chat/name` \
**Method:** `PUT`

**Description:** Change the name of a given chat. \
**Sample body:**
```json 
{
    "chatId": "1",
    "chatName": "new chat name"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/chat/visibility` \
**Method:** `PUT`

**Description:** Change the visibility of a given chat. \
**Note:** Values for visibility are expected to be `public` or `private`. \
**Sample body:**
```json 
{
    "chatId": "1",
    "visibility": "private"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/chat/community` \
**Method:** `PUT`

**Description:** Edit the community that a chat is associated with. \
**Sample body:** 
```json 
{
    "chatId": "1",
    "communityId": "456"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/chat/community` \
**Method:** `GET`

**Description:** Get a list of public chats that is associated with a given community. \
**Sample body:** 
```json 
{
    "communityId": "456"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/all_users` \
**Method:** `GET`

**Description:** Gets a list of users in the chat. \
**Sample body:** 
```json 
{
    "chatId": "1"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/user` \
**Method:** `PUT`

**Description:** Adds a user to a given chat. \
**Note:** User can be added by userId or email\
**Sample body:** 
```json 
{
    "chatId": "1",
    "userId": "123"
}
```

```json
{
    "chatId": "1",
    "email": "cutie@hotmail.com"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/user` \
**Method:** `DELETE`

**Description:** Removes a user to a given chat. \
**Note:** User can be added by userId or email\
**Sample body:** 
```json 
{
    "chatId": "1",
    "userId": "123"
}
```

```json
{
    "chatId": "1",
    "email": "cutie@hotmail.com"
}
```

---

**Endpoint:** `~/rest/fanlinc/chatmanagement/all_user_chats` \
**Method:** `GET`

**Description:** Gets a list of chats that a user is part of. \
**Sample body:** 
```json 
{
    "userId": "123"
}
```

---
