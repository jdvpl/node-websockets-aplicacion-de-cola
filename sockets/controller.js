const {v4:uuidv4}=require("uuid")
const TicketControl = require("../models/ticket-control")


const ticketControl= new TicketControl();
const socketController=(socket) =>{

  socket.emit("ultimo-ticket",ticketControl.ultimo)
  socket.emit("estado-actual",ticketControl.ultimos4)
  socket.emit("tickets-pendientes",ticketControl.tickets.length)

  socket.on('siguiente-ticket',(payload,callback)=>{
    const siguiente=ticketControl.nextTicket();
    callback(siguiente);
    
    // Notificar que hay un nuevo ticket pendiente
    socket.broadcast.emit("tickets-pendientes",ticketControl.tickets.length)
  })
  socket.on('atender-ticket',({escritorio},callback)=>{
    if(!escritorio){
      return callback({
        ok:false,
        msg: "El escritorio es obligatorio"
      });
    }
    const ticket=ticketControl.attendTicket(escritorio);
    // /notificar cambio en los ultimos 4
    socket.broadcast.emit("estado-actual",ticketControl.ultimos4)
    // emitir cantidad
    socket.emit("tickets-pendientes",ticketControl.tickets.length)
    socket.broadcast.emit("tickets-pendientes",ticketControl.tickets.length)


    if(!ticket){
      return callback({
        ok:false,
        msg: "Ya no hay tickets"
      });
    }else{
      return callback({
        ok:true,
        ticket
      });
    }
  })
}

module.exports={
  socketController
}