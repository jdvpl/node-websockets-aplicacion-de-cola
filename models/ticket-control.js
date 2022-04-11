const path = require('path');
const fs= require('fs');

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
  
}

module.exports=TicketControl;