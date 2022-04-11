const {v4:uuidv4}=require("uuid")
const TicketControl = require("../models/ticket-control")


const ticketControl= new TicketControl();
const socketController=(socket) =>{

  socket.emit("ultimo-ticket",ticketControl.ultimo)

  socket.on('siguiente-ticket',async(payload,callback)=>{
    const siguiente=ticketControl.nextTicket();
    callback(siguiente);
    // TODO: Notificar que hay un nuevo ticket pendiente
  })
}

module.exports={
  socketController
}