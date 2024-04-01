# Fanlinc System Design

BestTeam CSCC01

## Document Control

DRAFT v4

Authors:

- Jun Zheng (jun dot zheng at mail dot utoronto dot ca)
- William Song (willy dot song at mail dot utoronto dot ca)
- Donnie Siu (donnie dot siu at mail dot utoronto dot ca)

_Please add your name to above authors list when you contribute, and please increase the version number._

- [Fanlinc System Design](#fanlinc-system-design)
  * [Document Control](#document-control)
  * [1. Introduction](#1-introduction)
    + [1.1 Purpose of the System](#11-purpose-of-the-system)
    + [1.2 Audience](#12-audience)
  * [2. Purposed Architecture](#2-purposed-architecture)
    + [2.1 Overview](#21-overview)
    + [2.2 Operating Environments](#22-operating-environments)
    + [2.3 Service Decomposition](#23-service-decomposition)
      - [2.2.1 API Gateway](#221-api-gateway)
      - [2.2.2 Identity Service](#222-identity-service)
      - [2.2.3 Authorization Service](#223-authorization-service)
      - [2.2.4 User Profile Service](#224-user-profile-service)
      - [2.2.5 Chat Management Service](#225-chat-management-service)
      - [2.2.6 Chat Server](#226-chat-server)
  * [3. Subsystem Architecture](#3-subsystem-architecture)
    + [3.1 API Gateway](#31-api-gateway)
    + [3.2 Identity Service](#32-identity-service)
      - [3.2.1 Identity Management](#321-identity-management)
      - [3.2.2 Email Verification](#322-email-verification)
    + [3.3 Chat-Management Service](#33-chat-management-service)
      - [3.3.1 Chat-Management Back-end Workflow](#331-chat-management-back-end-workflow)
      - [3.3.2 Chat-Management Database Design](#332-chat-management-database-design)
      - [3.3.3 Chat-Management CRC-Cards](#333-chat-management-crc-cards)
    + [3.4 Community Service](#34-community-service)
    + [3.5 User Profile Service](#35-user-profile-service)
  * [4. Dependencies](#4-dependencies)

## 1. Introduction

### 1.1 Purpose of the System

Fanlinc is a large-scale social media site that allows fans to discover local groups more easily. The system must provide three major services: account management, group chat and event management. Detailed descriptions and features needed can be found within `/sprint0` folder and/or on JIRA.

It is a brand-new system, we have no existing codebase to work with, therefore we are free to choose various technologies that we see fit.

### 1.2 Audience

This document is intended to be technical, and is intended to give developers a high-level overview of the whole system from the front to back.

## 2. Purposed Architecture

### 2.1 Overview

The software will be developed using microservice architecture, there are many reasons for this, following are the main advantages:

- **Faster on-boarding and smaller learning curve**. Microservices allows each developer to choose their own desiered language and framework, this makes sure everyone can be using the language of their choice.

- **Rapid parallel development**. Multiple microservices can be developed in parallel without interfering with each other.

There are many disadvantages as well, however, we believe the benefits outweighs the drawbacks.

### 2.2 Operating Environments

We assume each service is packaged using Docker and is running in a POSIX compliant environment (macOS or Linux).

The backend application will be deployed on AWS and we assume it will be configured with its own VPC with all internal networks routed through Canada Montreal Region.

MongoDB, Redis and Neo4j will be deployed on a dedicated server with no password protection and no public network access, only internal resources within VPC can access these applications.


### 2.3 Service Decomposition

All services passes through API gateway except the chat servers. All APIs should use their own database, no shared database instance allowed. However there is one shared Redis instance if you need global queue or global locking.

(Since this is clearly not MVC because it is on a system level, here is the link to prove that the architecture is common: https://microservices.io)

![](https://i.imgur.com/YnvpOMR.png)

#### 2.2.1 API Gateway

API gateway serves as a single-point of entry for all HTTP APIs. Upon entering the API gateway, it will do some basic checks and pass the request down to downstream services.

#### 2.2.2 Identity Service

Identity service solely provides identity managements capabilities. It validates a user's JWT token and issues a JWT token upon authentication.

#### 2.2.3 Authorization Service

Authorization services provides the capability of storing user permissions, it functions very similarly to security junctions.

#### 2.2.4 User Profile Service

User profile service is responsible for storing user profile informations. For example, profile pictures, name, address, bio etc.

#### 2.2.5 Chat Management Service

Chat management service manages group chat sessions and routes users to apporporite chat servers. It also manages the chat server cluster, scaling it as needed.

#### 2.2.6 Chat Server

Chat service provide services to send and receive messages. Since chats are real-time, chat service will utilize websocket as its interface.

## 3. Subsystem Architecture

This section will discuss the detailed architecture for subsystems, each subsystem is designed seperately.

### 3.1 API Gateway

API gateway will be implemented using Nginx, as there is not many rules, all API endpoints will be mostly transparent. Nginx will act as a HTTP reverse proxy to map each micro-service to different paths.

Following graph illustrates how API gateway works (there might be more services), solid arrow indicates public network, dotted arrow indicates private network.

![](https://i.imgur.com/xgwnCIA.png)

### 3.2 Identity Service

Identity service provides services for all identity related operations. It is used to create users, login, and verify authorization tokens.

This service will utilize many third party APIs, and will utilize Python Flask as its web framework. Two dominant APIs this service will use are Firebase and SendGrid.

#### 3.2.1 Identity Management

Identity service manages user credentials using Firebase, therefore it is simply a proxy for Firebase APIs. It will call Firebase APIs to do basic operations such as creating user and verifying password. However we use our own JWT token internally to identify a user. To better illustrate the concept, attached is the login flow for identity service:

![](https://i.imgur.com/CONPF6X.png)
![](https://i.imgur.com/Bl3tS0e.jpg)
![](https://i.imgur.com/I6zfnUn.jpg)

#### 3.2.2 Email Verification

Email verification is again managed by Firebase, however we use SendGrid to send out the email. Identity service will still work fine without user's email being verified, however internal systems can query a user's email verification status.

### 3.3 Chat-Management Service

The chat-management service has the responsibility of managing the properties of the chat. Some of these properties include but are not limited to chat name, chat users, and chat roles for each user.

#### 3.3.1 Chat-Management Back-end Workflow

The following diagram represents the back-end work flow for the chat-management service. The boxes represent classes and the arrows represent collaboration between the classes. The design is divided into 4 layers, the first layer is the view or front-end, the second layer is the controller, the third layer is the service and the fourth layer is the model. The design also includes a ChatManagement Data Access Object to encapsulate the chosen database.

![](https://i.imgur.com/nRPsoge.png)

#### 3.3.2 Chat-Management Database Design

The database being utilized currently is the NoSQL database MongoDB. Data storage is broken down into 3 collections. The `Chat` collection, `ChatUsers` collection and `ChatRoles` collection.

The schema for each collection is as follows:

`Chat collection:`
```json
{
    "chat_id": String,
    "name": String,
    "is_public": bool
}
```

`ChatUsers collection:`
```json
{
    "chatId": String,
    "users": [{"userId": Long, "roles": [roleId]}]
}
```

`ChatRoles collection:`
```json
{
    "roleId": String,
    "description": String
}
```

#### 3.3.3 Chat-Management CRC-Cards

Below contains a more detailed description of the chat-management design in the form of CRC-cards.

![](https://i.imgur.com/nDOIbod.png)
![](https://i.imgur.com/NsaaHVx.png)
![](https://i.imgur.com/ND7nwSw.png)
![](https://i.imgur.com/FMNQWAN.png)
![](https://i.imgur.com/vE1B14h.png)

### 3.4 Community Service

Community service provides services for all communtiy related operations. It is used to create, edit, and remove communities. See the [community service documentation](services/community-service/README.md) for more information.

![Nodes Representation Example](https://i.imgur.com/m181Zme.png)

![Community Service CRC Cards](https://i.imgur.com/8tMh723.png)

### 3.5 User Profile Service

The user profile service provides services for all user profile related operations. It is used to create, edit, and remove user profiles.

![User Profile CRC Cards](https://i.imgur.com/7P7p4f6.png)

## 4. Dependencies

We plan to use Docker to host what our system is dependent on. Use the latest versions unless specified otherwise. Thus far we need:

- Neo4j
- MongoDB
- Java
- Spring

To be continually added to...
