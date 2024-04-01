# Fanlinc Chat Server

Chat server manages a chat room using WebSocket.

## System Requirements

* Docker 18+

If you are running development environment, then the following are required:

* Node 10+

## Quick Start

To start a development server, run the commands:

```bash
$ npm install
$ npm start
```

To build a production image run:

```
$ docker build -t fanlinc-chat-server:latest .
```

To start a production image:

```
$ docker run -p 3000:3000 -d fanlinc-chat-server:latest
```
