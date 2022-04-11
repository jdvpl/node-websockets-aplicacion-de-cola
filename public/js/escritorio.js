const searchParams = new URLSearchParams(window.location.search);

// /referencias html
const lblEscritorio=document.querySelector('h1');
const btnAtender=document.querySelector('button');
const lblTicket=document.querySelector('small');
const divAlert=document.querySelector('.alert');

if(!searchParams.has('escritorio')){
  window.location='index.html';
  throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');

lblEscritorio.innerText=escritorio;
divAlert.style.display='none';

const socket = io();
socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled=false;
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled=true;
});

socket.on('ultimo-ticket',ultimo=>{
  // lblNuevoTicket.innerHTML='Ticket '+ultimo;
});


btnAtender.addEventListener( 'click', () => {

    socket.emit( 'atender-ticket', {escritorio}, ({ok,ticket,msg}) => {
        if(!ok) {
          lblTicket.innerText='Nadie';
          return divAlert.style.display  = '';
        }
        lblTicket.innerText=`Ticket ${ticket.numero}`

    });

});