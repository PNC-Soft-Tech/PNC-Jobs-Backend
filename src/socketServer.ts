import { Socket, Server as SocketIOServer } from "socket.io";
import authSocket from "./app/middlewares/authSocket";
import {
  addNewConnectedUser,
  handleSendMultipleUser,
  messagesHandler,
  removeConnecteduser,
  roomHandler,
  setSocketServerInstance,
} from "./app/SocketHandler/ServerStore";
import { SendNewMessages } from "./app/SocketHandler/SendNewMessages";
import Message from "./app/modules/message/message.model";
// Extend the Socket interface
declare module "socket.io" {
  interface Socket {
    user?: any;
  }
}

export const events = {
  connection: "connection",
  disconnect: "disconnect",
  joinRoom: "join_room",
  leaveRoom: "leave_room",
  messageFromClient: "message_from_client",
  messageToClient: "message_to_client",
  sendMultipleUser: "send_multiple_user",
  readMessageFromClient: "read_message_from_client",
  readMessageToClient: "read_message_to_client",
  // messageCheck: 'message_check'
};

export const registerSocketServer = (server: any) => {
  const io = new SocketIOServer(server, {
    // path: '/',
    pingTimeout: 60000,
    transports: ["polling", "websocket"],
    allowEIO3: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("error", (error) => {
    console.error("Socket.IO server initialization error: ", error);
  });

  // setSockets Instances
  setSocketServerInstance(io);

  // use middleware for authentications sockets routes
  io.use((socket, next) => {
    authSocket(socket, next);
  });

  io.on(events.connection, (socket: Socket) => {
    console.log("socket connected: ", socket.user?.userName);
    // Extract userId from socket if available
    if (socket.user) {
      addNewConnectedUser(socket.id, socket.user.id);
    }

    socket.on(events.disconnect, () => {
      console.log("socket disconnected: ", socket.user?.userName);
      removeConnecteduser(socket.id);
    });

    // listening for custom events
    socket.on(events.joinRoom, (roomId: string) => {
      socket.join(roomId);
      console.log("user joined room: ", roomId);
    });

    socket.on(events.leaveRoom, (roomId: string) => {
      console.log("user left room: ", roomId);
      socket.leave(roomId);
    });

    socket.on(
      events.sendMultipleUser,
      async (payload: any, ackCallback: Function) => {
        console.log(`\n${events.sendMultipleUser}`);
        console.log("payload: ", payload);
        await handleSendMultipleUser(socket, payload);
        if (ackCallback) {
          ackCallback({ success: true });
        }
      }
    );
    socket.on(events.messageFromClient, (payload) => {
      // console.log("Check Payload", payload, typeof (payload))
      if (typeof payload === "string") {
        payload = JSON.parse(payload);
      }
      let { chatId, messages, messageType } = payload;
      // MessagesHandler
      messagesHandler(chatId, messages, messageType, socket);
    });

    socket.on(events.readMessageFromClient, async (payload: any) => {
      // console.log("socket readMessageFromClient payload: ", typeof (payload), payload)
      const messageIds = payload.unreadList.map((_it: any) => _it.messageId);
      const unreadMessages = await Message.find({
        // chatId: payload.chatId,
        // isRead: false,
        // sender: { $ne: userId }
        _id: { $in: messageIds },
      });
      console.log("messageIds: ", messageIds);
      console.log("unreadMessages.length: ", unreadMessages.length);
      for (const message of unreadMessages) {
        message.isRead = true;
        await message.save();
      }
      socket
        .to(payload.chatId)
        .emit(events.readMessageToClient, payload.unreadList || []);
    });
  });
};
