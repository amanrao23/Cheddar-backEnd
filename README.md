# Cheddar- A messaging App


<!-- > This note is yours, feel free to play around.  :video_game: 
> Type on the left :arrow_left: and see the rendered result on the right. :arrow_right:  -->
## :memo: Demo

https://user-images.githubusercontent.com/54672230/109388794-469c3c00-792f-11eb-9cbd-0a55cbbdd76e.mp4


## :memo: Introduction

### The aim of this project is to build a functional real-time messaging application using MERN stack. This is the backend of the project. Find frontend of the project [here](https://github.com/amanrao23/Cheddar-FrontEnd).

<!-- 

- [x] Create my first HackMD note (this one!)
- [ ] Change its title
- [ ] Add a tag

:rocket:  -->



## :memo: Overall flow

![](https://i.imgur.com/GSFSINW.png)
 
<!-- ![](https://i.imgur.com/SPRcfjy.png) -->

## :memo: New/Edit/Delete Message
<!-- ![](https://i.imgur.com/RxlncmI.png) -->
![](https://i.imgur.com/luxgirF.png)


## :memo: Database and Models




- ### Users ###

```javascript
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
   date: {
        type: String,
        default: Date.now,
    }
})
```
<!-- 

- ### Messages ###

```javascript
const MessageSchema = new Schema({
    
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    }
})
``` -->
- ### Events ###

```javascript
const EventSchema = new Schema({
    
    sender:{
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref:'conversation'
    },
    messageNumber:{
        type:Number,
        required:'true',
    },
    type: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now,
    }
})
```


- ### Conversations ###

```javascript
const ConversationSchema = new Schema({

    recipients: [{ type: Schema.Types.ObjectId, 
                   ref: 'users' }]
})
```

&nbsp;
# :memo: End Points
## Authentication 
### **Get User**
  Get user by token
  


| URl               | Method                  |URL Params|
| ----------------- |:----------------------- |--------|
|   /auth           | GET                     | None


**URL Params**

   
<!--    **Requ6t ired:** -->
 
<!--    `id=[integer]` -->

**Body Params**

  None

**Success Response:**
 ```json
  {
      "status":"success",
      "code":200,
      "token":"someToken"
  }
  ```  
**Error Response:**
```json
  {
      "status":"failure",
      "code":404,
      "error":"User doesn't exist"
  }
          OR
  {
      "status":"failure",
      "code":401,
      "error":"You are unauthorized to make this request"
  }
          OR
  {
      "status":"failure",
      "code":500,
      "error":"SERVER ERROR"
  }
  ```  
  
&nbsp;
    
    
 
### **Authenticate**
  Authenticate, login user & get jwt token. 
  
  
| POST | /auth |
|:---- |:----- |

  
**URL Params**

   None
&nbsp;
 

**Body Params**

| Name     | Desciption                           |
| -------- |:------------------------------------ |
| email    | Email with which the user registered. |
| password | Latest password of the user.          |

**Example**

  ```json
  {
      "email":"email@email.com",
      "password":"password"
  }
  ```  
<!--   
 **Response**
     
| Name              | Code                  |Content|
| ----------------- |:----------------------- |--------|
|   Success           | 200                     | `{ token : "dgdfsjhjtjfdfdhffg" }`|
|   Error        | 401                     | `{ error : "User doesn't exist" }`|
|   Error          | 500                     | `{ error : "Internal Server Error" }`| -->
**Success Response:**
 ```json
  {
      "status":"success",
      "code":200,
      "token":"skfbakgbafkgbgkbgkvjbdgjdskbvfdkbdslkvbfdkbjvdfdfvfd"
  }
  ```  
**Error Response:**
```json
  {
      "status":"failure",
      "code":404,
      "error":"User doesn't exist"
  }
          OR
  {
      "status":"failure",
      "code":500,
      "error":"SERVER ERROR"
  }
  ```  
&nbsp;

 
 ## Users 
### **Register**

  Register a new User.
  
| POST | /user |
|:---- |:----- |

  
**URL Params**

   None


**Body Params**

| Name     | Desciption                           |
| -------- |:------------------------------------ |
| name    | Name of the user. |
|username    | Username the user wishes to take. |
| email    | Email with which the user wishes to register. |
| password |  Password which user wishes to set.         |

 
**Example**

  ```json
  { 
      "name":"name",
      "username":"username",
      "email":"email@email.com",
      "password":"password"
  }
  ```  
&nbsp;

**Success Response:**
 ```json
  {
      "status":"success",
      "code":200,
      "token":"skfbakgbafkgbgkbgkvjbdgjdskbvfdkbdslkvbfdkbjvdfdfvfd"
  }
  ```  
**Error Response:**
```json
  {
      "status":"failure",
      "code":400,
      "error":"User already exists"
  }
          OR
  {
      "status":"failure",
      "code":500,
      "error":"SERVER ERROR"
  }
  ```  
<!--  **Response**
     
| Name              | Code                  |Content|
| ----------------- |:----------------------- |--------|
|   Success           | 200                     | `{ token : "dgdfsjhjtjfdfdhffg" }`|
|   Error        | 400                     | `{ error : "User already exists" }`|
|   Error          | 500                     | `{ error : "Internal Server Error" }`| -->

 &nbsp;
 
 ### **Conversations**
  Get conversation list of a user.
  
| GET | /user/conversations |
|:---- |:----- |

  
**URL Params**

   None

 

**Body Params**
None


**Success Response:**
 ```json
  {
      "status":"success",
      "code":200,
      "conversations":{"conversation_1","conversation_2","conversation_3"},
  }
  ```  
**Error Response:**
```json

  {
      "status":"failure",
      "code":500,
      "error":"SERVER ERROR"
  }
  ```  
  
  &nbsp;
 ### **New Conversation**
  Create a new conversation. 
| GET | /user/newConversation |
|:---- |:----- |

  
**URL Params**

   None

**Body Params**
| Name     | Desciption                           |
| -------- |:------------------------------------ |
| username    | username of the other user |

**Example**

  ```json
  { 
      "username":"username"
  }
  ```  
**Success Response:**
 ```json
  {
      "status":"success",
      "code":200,
      "conversation":{conversation object}
  }
  ```  
**Error Response:**
```json

  {
      "status":"failure",
      "code":500,
      "error":"SERVER ERROR"
  }
  ```  
  
  &nbsp;
 ## Events 

  
  ### **New/Edit/Delete Message Event**
  A combined API call to create a new message, edit a sent message and delete a given message.
  
| POST | /event |
|:---- |:----- |

  
**URL Params**

   None


**Body Params**

| Name     | Desciption                           |
| -------- |:------------------------------------ |
|text    | Message to be sent. |
|type    | New/Edit/Delete |
|messageId    | Message Id of the given message. |
|chatRoomId    | Id of the given room |

 
**Example**

  ```json
  { 
      "text":"Hello World",
      "messageId":"",
      "type":"new",
      "chatRoomId":"60186eff8435dfbffdc19b61"
  }
  ```  


**Success Response:**
 ```json
  {
      "status":"success",
      "code":200,
      "message":"message sent successfully"
  }
      OR
  {
      "status":"success",
      "code":200,
      "message":"message updated successfully"
  }
      OR
  {
      "status":"success",
      "code":200,
      "message":"message deleted successfully"
  }
  ``` 
**Error Response:**
```json
  {
      "status":"failure",
      "code":404,
      "error":"User doesn't exist"
  }
      OR
  {
      "status":"failure",
      "code":500,
      "error":"SERVER ERROR"
  }
  ```  
  &nbsp;
<!-- &nbsp;
 
 ### **Get Message Events**

 Get all message events of a chat.
  
| GET | /message |
|:---- |:----- |

  
**URL Params**

   None
 

**Body Params**

| Name     | Desciption                           |
| -------- |:------------------------------------ |
| chatRoomId    | Id of the given chat room. |

**Example**

  ```json
  { 
      "chatRoomId":"60186eff8435dfbffdc19b61"
  }
  ```  

**Success Response:**
 ```json
  {
      "status":"success",
      "code":200,
      "events":[events]
  }
  ```  
**Error Response:**
```json
  {
      "status":"failure",
      "code":404,
      "error":"User doesn't exist"
  }
      OR
  {
      "status":"failure",
      "code":500,
      "error":"SERVER ERROR"
  }
  ```  
  ---
  &nbsp; -->
  
  ### **Get Message Events After a timestamp**

 Get all message events of a chat created after a given timestamp.
  
| GET | /event |
|:---- |:----- |

  
**URL Params**

   None
 

**Body Params**

| Name     | Desciption                           |
| -------- |:------------------------------------ |
| chatRoomId    | Id of the given chat room. |
| timestamp(optional)    | Cutoff time  |

If timestamp is not passed, all the messages of that chat will be fetched.

**Example**

  ```json
  { 
      "chatRoomId":"60186eff8435dfbffdc19b61",
      "timestamp":"2021-02-02T15:41:54.000+00:00"
  }
  ```  

**Success Response:**
 ```json
  {
      "status":"success",
      "code":200,
      "events":[events]
  }
  ```  
**Error Response:**
```json
  {
      "status":"failure",
      "code":404,
      "error":"Chat room doesn't exist"
  }
      OR
  {
      "status":"failure",
      "code":500,
      "error":"SERVER ERROR"
  }
  ```  
  ---
  &nbsp;

  
# Socket.io  #

## Introduction ##
When a user is authenticated, a new socket is created and multiple chat rooms are created with that socket.

Below are the socket events that are used in this application.

##  Events  ##


**showOnline**
---
- When the user login to the application, this event will be fired and the status of the user will be set to online.

**showOffline**
---
- When the user logouts the application, this event will be fired and the status of the user will be set to offline.



**recievedMessage**
---
- When the user login to the application, this event will be fired and the status of the messages will be changed from delivered to recieved.

**readMessage**
---
- When the user opens a specific chat window, this event will be fired and the status of the unread messages will be changed from recieved to read.


**typing**
---
- Whenever a user is typing in the chatbox this event will be fired to notify the other participants in the chat that this user is 'typing'.

**messageEvent**
---
- This event will be fired when a user creates a new message, edits a message or delete a given message.
- It will inturn emit the message to all the participants of the chat. 
- It will also take care of updating the chats with the new message.
<!-- 

**editMessage**
---
- This event is fired to update the message in the database and realtime chat that the user has selected to edit. 


**deleteMessage**
---
- This event is fired to delete the message in the database and realtime chat that the user has selected to delete. 
 -->
---

# Edge Cases #


- The event for a new/edit/delete message is only fired when the API call is a success.
- The messages in a chat room have unique message numbers for sequential display.
- In case of loss of internet connectivity, the messages of a chat remain saved in the redux state and once back online, the new messages are appended/updated in that state only.
- If an old message is deleted, all the users in that chat are notified.
