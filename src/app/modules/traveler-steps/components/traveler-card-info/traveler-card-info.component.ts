import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-traveler-card-info',
  templateUrl: './traveler-card-info.component.html',
  styleUrls: ['./traveler-card-info.component.css']
})
export class TravelerCardInfoComponent implements OnInit {

  @Output() deleteMe: EventEmitter<any> = new EventEmitter();
  @Output() addGareTodata: EventEmitter<any> = new EventEmitter();
  @Input() card:any;
  @Input() stations:any;
  error:boolean=true;
  
  stationSelectedName: string='';

  constructor() { } 

  ngOnInit(): void {

    if(this.card.station){
   
        this.stationSelectedName = this.card.station.name;
  
    }

  } 


  onDelete(){

    this.deleteMe.emit(this.card.index);
  }

  // select gare

  selectGare(result) {

    this.stationSelectedName = result.name;
    this.card.station = result ;

   

    if(this.card.nameVoyager !== '' && this.card.station){
      this.card.error = false;

        this.addGareTodata.emit(this.card);

    }

    
  

  }

  changeName() {

   

          if(this.card.nameVoyager !== '' && this.card.station){

            this.card.error = false;
          
              this.addGareTodata.emit(this.card);

        }

  
  }



}
