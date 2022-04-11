const {v4:uuidv4}=require("uuid")
const TicketControl = require("../models/ticket-control")


const ticketControl= new TicketControl();
const socketController=(socket) =>{

  socket.on('enviar-mensaje',async(payload,callback)=>{
    // leyendo los mensajes
    socket.broadcast.emit('enviar-mensaje',payload)
    const id=uuidv4();
    callback(id)

  })
}

module.exports={
  socketController
}