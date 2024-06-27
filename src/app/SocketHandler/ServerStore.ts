import { Socket } from "socket.io";
import { MessageServices } from "../modules/message/message.service";
import Chats from "../modules/chat/chats.model";
import { ChatServices } from "../modules/chat/chats.service";
import { Types } from "mongoose";
import Message from "../modules/message/message.model";
import { events } from "../../socketServer";
import { IChat } from "../modules/chat/chats.interface";
import User from "../modules/auth/auth.model";

// Store socket info for Users
// let connectedUsers = new Map();
type ConnectedUser = { socketId: string; userId: string };
const connectedUsers: Map<string, ConnectedUser> = new Map();
// Keep track of connected users and their rooms
const connectedUsersInRoom = new Map();

let io: any = null;

export const setSocketServerInstance = (ioInstance: any) => {
  io = ioInstance;
};
export const getSocketServerInstance = () => {
  return io;
};
export const addNewConnectedUser = (socketId: any, userId: any) => {
  connectedUsers.set(socketId, { socketId, userId }); // Explicitly define socketId

  // console.log("NewConnected users", connectedUsers);
};
export const removeConnecteduser = (socketId: any) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    // console.log("Disconnect user");
    // console.log(connectedUsers);
  }
};

export const roomHandler = async (oldRoomId: any, newRoomId: any, socket: Socket) => {
  // Add user to room
  // Remove user from old room
  if (connectedUsersInRoom.has(oldRoomId) && (oldRoomId != null || oldRoomId != "null")) {
    const index = connectedUsersInRoom.get(oldRoomId).indexOf(socket.id);
    if (index !== -1) {
      connectedUsersInRoom.get(oldRoomId).splice(index, 1);
      if (connectedUsersInRoom.get(oldRoomId).length == 0) {
        socket.leave(oldRoomId);
      }
      // Emit event that user left the old room
      socket.to(oldRoomId).emit('userLeftRoom', socket.id, oldRoomId);
    }
  }
  // Add user to new room
  if (!connectedUsersInRoom.has(newRoomId)) {
    connectedUsersInRoom.set(newRoomId, []);
  }

  // check Already Exit in room or not 
  if (connectedUsersInRoom.get(newRoomId)) {
    let roomUsers = connectedUsersInRoom.get(newRoomId);
    if (!roomUsers.includes(socket.id)) {
      connectedUsersInRoom.get(newRoomId).push(socket.id);
    }
  }
  socket.join(newRoomId);
  console.log("Room users ", socket.id, newRoomId, connectedUsersInRoom)
  // console.log("Current Room", socket.rooms)

  // Emit event that user joined the new room
  socket.to(newRoomId).emit('userJoinedRoom', socket.id, newRoomId);

  let ChatMessages: any[] = []//await getMessagesByChatsWithoutParams(newRoomId)

  console.log("Check Exiting Messages", ChatMessages)
  socket.to(newRoomId).emit('room_messages', ChatMessages); // Send data to the room
}

export const getOnlineUsersNotInRoom = () => {
  const onlineUsersNotInRoom: string[] = [];


  connectedUsers.forEach(user => {
    // const socketId = user.socketId;
    const socketId: string = user.socketId;
    let isInRoom = false;

    connectedUsersInRoom.forEach(roomUsers => {
      if (roomUsers.includes(socketId)) {
        isInRoom = true;
        return;
      }
    });

    if (!isInRoom) {
      onlineUsersNotInRoom.push(socketId);
    }
  });

  return onlineUsersNotInRoom;
};

export const messagesHandler = async (chatID: any, messages: any, messageType: any, socket: Socket) => {
  // Create a new message payload
  const newMessagePayload = {
    chatId: chatID, // Sample chatId, should be ObjectId
    sender: socket?.user?._id,  // Sample senderId, should be ObjectId
    messages: messages, // Message content
    messageType: messageType, // Message type, defaulting to "text"
    isRead: false // Read status, defaulting to false
  };
  const newMessages = await MessageServices.createMessage(newMessagePayload)

  // Emit messages   for  a specific room 
  socket.to(chatID).emit("send_messages", newMessages);

  // emit messages  that is not in room but active online  
  let activeUsers = getOnlineUsersNotInRoom();
  activeUsers.forEach((userSocketId) => {
    socket.to(userSocketId).emit("send_messages", newMessages)
  })



}


export const handleSendMultipleUser = async (socket: Socket, payload: any) => {
  try {

    const {
      chatId,
      friendIds,
      imageUrl
    } = payload

    const {
      _id: userId
    } = socket.user
    // const messages = [];
    if (chatId) {
      const createdMessage = new Message({
        chatId,
        sender: userId,
        messages: imageUrl
      })
      await createdMessage.save()
      console.log('update chat updatedAt: chatId, chat.updatedAt, new Date(): ', chatId, new Date())
      await Chats.findByIdAndUpdate(chatId, { updatedAt: new Date() })
      // console.log('createdMessage: ', createdMessage.toJSON())
      console.log('sending room: ', chatId)
      // const sender = await User.findById()
      const {
        userName,
        email,
        profileImage,
        displayName
      } = socket.user
      const resJSON = {
        ...createdMessage.toJSON(),
        sender: {
          _id: userId,
          userName,
          email,
          profileImage,
          displayName
        }
      }
      socket.to(chatId).emit(events.messageToClient, resJSON)
    } else {
      for (const friendId of friendIds) {
        const fResult: any[] = await Chats.aggregate([
          {
            $match: {
              groupId: { $exists: false },
              $expr: {
                $or: [
                  {
                    $and: [
                      { $eq: [{ $size: "$members" }, 2] },
                      { $eq: [{ $arrayElemAt: ["$members", 0] }, new Types.ObjectId(userId)] },
                      { $eq: [{ $arrayElemAt: ["$members", 1] }, new Types.ObjectId(friendId)] }
                    ]
                  },
                  {
                    $and: [
                      { $eq: [{ $size: "$members" }, 2] },
                      { $eq: [{ $arrayElemAt: ["$members", 0] }, new Types.ObjectId(friendId)] },
                      { $eq: [{ $arrayElemAt: ["$members", 1] }, new Types.ObjectId(userId)] }
                    ]
                  }
                ]
              }
            }
          }
        ])

        console.log('chat found all: ', fResult)
        let chat: any = {}

        if (fResult.length) {
          chat = fResult[0]

          if (chat._id) {
            console.log('update chat updatedAt: chat._id, chat.updatedAt, new Date(): ', chat._id, chat.updatedAt, new Date())
            await Chats.findByIdAndUpdate(chat._id, { updatedAt: new Date() })
          }

        } else {
          const createBody = { members: [userId, friendId] }
          console.log('create body: ', createBody)
          chat = await ChatServices.createChat(createBody);
          console.log('chat created: ', chat);

        }

        const createdMessage = new Message({
          chatId: chat._id,
          sender: userId,
          messages: imageUrl
        })
        await createdMessage.save()
        // console.log('createdMessage: ', createdMessage.toJSON())
        console.log('sending room: ', chat._id)
        // const sender = await User.findById()
        const {
          userName,
          email,
          profileImage,
          displayName
        } = socket.user
        const resJSON = {
          ...createdMessage.toJSON(),
          sender: {
            _id: userId,
            userName,
            email,
            profileImage,
            displayName
          }
        }
        socket.to(chat._id.toString()).emit(events.messageToClient, resJSON)

      }
    }


    // return createdMessage
  } catch (error) {
    console.log('handleSendMultipleUser error: ', error)
  }

}