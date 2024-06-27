import { MessageServices } from "../modules/message/message.service";


export const SendNewMessages=async (socket: any,data: any)=>{
    try {
        console.log("direct message event is being handled ");
        const { _id } = socket.user;

        let message={
            ...data,sender:_id
        }
        const newMessages={data}
        console.log("New data",data)

        // create new Messages 
        // const newMessages=await MessageServices.createMessage(message)
        // socket.emit("send-message",newMessages);

      } catch (error) {
        console.log(error);
      }

}