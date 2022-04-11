const path = require('path');
const fs= require('fs');

class Ticket{
  constructor(numero,escritorio) {
    this.numero=numero;
    this.escritorio=escritorio;
  }
}
class TicketControl{

  constructor() {
    this.ultimo=0;
    this.hoy= new Date().getDate(); //10
    this.tickets=[];
    this.ultimos4==[];
    
    this.init();
  }

  get toJson() {
    return{
      ultimo:this.ultimo,
      hoy:this.hoy,
      tickets:this.tickets,
      ultimos4:this.ultimos4
    }
  }

  init() {
    const {hoy,tickets,ultimos4,ultimo} = require('../data/data.json');
    if(hoy==this.hoy){
      this.tickets=tickets;
      this.ultimos4=ultimos4;
      this.ultimo=ultimo;
    }else{
      // es otro dia
      this.saveDb();

    }
  }

  saveDb() {
    const dbpath = path.join(__dirname, '../data/data.json');
    fs.writeFileSync(dbpath,JSON.stringify(this.toJson))
  }

  netTicket(){
    this.ultimo+=1;
    const ticket=new Ticket(this.ultimo,null);
    this.tickets.push(ticket);

    this.saveDb();
    return 'Ticket'+ ticket.numero;
  }

  attendTicket(escritorio){
    // no tenemos tickets
    if(this.tickets.length===0){
      return null;
    }
    // borrar el ticket atendido
    const ticket=this.tickets.shift();
    
    ticket.escritorio=escritorio;

    this.ultimos4.unshift(ticket);

    if(this.ultimos4.length>4){
      this.ultimos4.splice(-1,1)
    }

    this.saveDb();

    return ticket;
  }
  
}

module.exports=TicketControl;