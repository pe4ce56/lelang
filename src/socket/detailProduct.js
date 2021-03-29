import io from 'socket.io-client'
import { API } from '../config/config'
let socket
export const initiateSocket = (room) =>{
    socket = io(API);
    if(socket && room) socket.emit("joinRoom",room)
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if(socket) socket.disconnect();
}

export const subscribeToBid = (callback)=>{
    if(!socket) return(true);
    
    socket.on("bidChanged",(data)=>{
        return callback(null,data);
    })
}

export const sendBid = (room,data)=>{
    if(!socket)return
    socket.emit("bid",{room,data})
}

export const subcribeToComment = (callback)=>{
    if(!socket) return(true)

    socket.on("commentChanged",()=>{
        return callback(null)
    })
}

export const sendComment = (room)=>{
    if(!socket)return
    socket.emit("comment",room)
}