import { Component, OnInit,TemplateRef,Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-traveler-details',
  templateUrl: './traveler-details.component.html',
  styleUrls: ['./traveler-details.component.css']
})
export class TravelerDetailsComponent implements OnInit {

  modalRef: BsModalRef;
  modalRefFor: BsModalRef;
  @Input() userData:any;
  @Input() nameDestination:string;
  @Input() priceTotal:number;
 


  detailTicket:boolean=false;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {


  }

  openModal(template: TemplateRef<any>, close:boolean=false) {
    if(close){
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template, { animated: true});
  }

   onClickSeeDetailTicket(){

    this.detailTicket = !this.detailTicket;
 
     
   }




}
