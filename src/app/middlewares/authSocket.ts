import { jwtHelpers } from "../../utils/auth";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import User from "../modules/auth/auth.model";
import { Socket } from "socket.io";

const verifyTokenSocket = async (socket: Socket, next: (err?: any) => void) => {
  try {
    let token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.token ||
      socket.handshake.headers?.authorization ||
      socket.handshake.headers?.Authorization ||
      socket.handshake.headers?.jwt ||
      socket.handshake.auth?.token;

    if (token.includes("Bearer")) {
      token = token.split(" ")[1];
    }

    // verify token
    let verified = null;
    verified = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);
    const id = verified?._id;
    let verifiedUser = await User.findById(id);

    socket.user = verifiedUser;
    next();
  } catch (error) {
    // const socketError = new Error("NOT_AUTHORIZED");
    next(error);
  }
};

export default verifyTokenSocket;
