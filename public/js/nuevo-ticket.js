// referencias html
const lblNuevoTicket=document.querySelector('#lblNuevoTicket');
const btnCreateTicket=document.querySelector('button');

const socket = io();
socket.on('connect', () => {
    // console.log('Conectado');
    btnCreateTicket.disabled=false;
    
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCreateTicket.disabled=true;
});

socket.on('ultimo-ticket',ultimo=>{
  lblNuevoTicket.innerHTML='Ticket '+ultimo;
});


btnCreateTicket.addEventListener( 'click', () => {    
    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});