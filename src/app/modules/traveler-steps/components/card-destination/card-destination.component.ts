import { Component, OnInit , Input, EventEmitter, Output, TemplateRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiDataService } from "src/app/core/services/api.service";

declare var $;

@Component({
  selector: 'app-card-destination',
  templateUrl: './card-destination.component.html',
  styleUrls: ['./card-destination.component.css'],
  providers: [ ApiDataService ]
})
export class CardDestinationComponent implements OnInit {

  @Input() card:any;
  @Input() userVoyageur:any=[];
  @Input() cardDataNotEmpty:any=[];
  @Input() modeDestinations:string="every";
  @Output() seeSelected: EventEmitter<any> = new EventEmitter();
  @Output() mouseOverEvent: EventEmitter<any> = new EventEmitter();
  selected:boolean=false;
  carboneTotal:any;
  modalRef: BsModalRef;

  detailsCard:boolean=false;
  items: any[];

  videoEmbed:string="https://www.youtube.com/embed/fDGwzP2DKB8";

  constructor(private modalService: BsModalService,
              private Api:ApiDataService,
              private sanit: DomSanitizer) { 
    this.items = Array(15).fill(0);
  }

   
  ngOnInit(): void {
    this.getRandomIntInclusive();
  } 

  videoUrlBypassSecure(){
    return this.sanit.bypassSecurityTrustResourceUrl(this.videoEmbed)
  }

  openModal(template: TemplateRef<any>) {

    this.Api.getVideoANdEventsByVille({ville:this.card.uuid}).subscribe(
      (data) =>{

       // console.log(data);

        if(data.video !== null){
         this.videoEmbed = "https://www.youtube.com/embed/"+data.video.embed_youtube;
        }

        console.log(this.videoEmbed);
        //setTimeout(() => {
          this.modalRef = this.modalService.show(template);
        //}, 3000);

       
      
      })
    
  }

  onClickSeeDetailsCard(){

    this.detailsCard = !this.detailsCard;
    //console.log(this.userVoyageur);
     
   }

   onClickSelected(){ 
    //this.selected = !this.selected;

    if(this.card.selected === true){
      this.card.selected = false;
    }
    else{
      this.card.selected = true;

    }

  
 // this.card.selected = !this.card.selected

 console.log(this.card);

    this.seeSelected.emit(this.card);
 
     
   }


   mouseOverEventChange(card:any,value:boolean){

    let data ={
      card: this.card,
      see:value
    };

    this.mouseOverEvent.emit(data);

   }

 
   getRandomIntInclusive() {
    let min = 0.5;
    let max = 4;
    let result = Math.random() * (max - min) + min;
    //return result.toFixed(1);
    this.carboneTotal = result.toFixed(1);
  }


  checkIfEveryOrOnePeople(userData:any){
    //console.log(this.modeDestinations);
        
    if(this.modeDestinations === "every"){
      return true;
    }
    else if(this.modeDestinations === "onePeople"){
      //return true;
        if(userData.station.uuid === this.card.uuid){
          return true;
        }
        else{
          return false;
        }
    }
}

priceForPepole(){
 // console.log(this.modeDestinations);
      
  if(this.modeDestinations === "every"){
    return (this.card.price / this.cardDataNotEmpty.length) ;
  }
  else if(this.modeDestinations === "onePeople"){
   return this.card.price ;
  }
}


}
