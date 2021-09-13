import { Component, OnInit, EventEmitter, Output, Input,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiDataService } from "src/app/core/services/api.service";
import { ApiSocketService } from "src/app/core/services/socket.service";
import { NotificationsService } from "src/app/core/services/notifications.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.css'],
  providers: [ApiDataService,ApiSocketService, NotificationsService]
})
export class SidebarLeftComponent implements OnInit {

  

  @Output() onClickDirect: EventEmitter<any> = new EventEmitter();
  @Input() itemsDirect:any=[];
  @Input() itemsDirectCustom:any;
  @Input() itemsGroup:any=[];
  @Input() currentActive:any;

  modalRef: BsModalRef;
  modalRefFor: BsModalRef;
  directItemActive:any;
  groupItemActive:any;
  userConnect:any;
  typing:boolean=false;
  searchUserText:string="";
  suggestionsUsers:any = [];
  
  

  constructor(private apiservice: ApiDataService, 
              private socket:ApiSocketService,
              private modalService: BsModalService,
              private router: Router,
              private notification : NotificationsService) { }

  ngOnInit(): void {
    
    this.userConnect = JSON.parse(localStorage.getItem("loginUser"));
 // console.log(this.itemsDirectCustom)
  
  }
 

  SendUserNameChange(){

    if(this.searchUserText === ""){
      this.suggestionsUsers = [];
      return ;
    }

    
    this.apiservice.getUsersBySearch({search: this.searchUserText}).subscribe(data=>{

      this.suggestionsUsers = data;
     // console.log(this.suggestionsUsers);
    })

  }

  createConversation(user:any){


        //create conversation direct

        let participants = [
          {
            uuid: parseInt(this.userConnect.uuid),
            is_admin:true
          },
          {
            uuid: parseInt(user.uuid),
            is_admin:false
          }
        ]
    
        let conversation = {
          name:null,
          type:"direct",
          participants:participants
      };

      console.log(conversation);

      this.apiservice.createConversation(conversation).subscribe(data=>{

       // console.log(data);

       if(data.conversation_id){
        this.notification.showError(data.message, "error")
       }
    

        this.modalRef.hide();

      })

  }




  onClickSidebar(event:any){

    if(event.type === "direct"){
      this.directItemActive = event.index;
    }

    if(event.type === "group"){
      this.groupItemActive = event.index;
    }
    
    let data= {
      type:event.type,
      index:event.index

    }
    this.onClickDirect.emit(data);

  }

  onChangeTab(){

    this.directItemActive = null;
    this.groupItemActive = null;

    let data= {
      type:"blank",
      index:null

    }
    this.onClickDirect.emit(data);
  }




      openModal(template: TemplateRef<any>) {
       
        this.suggestionsUsers = [];
        this.searchUserText="";
        this.modalRef = this.modalService.show(template, {animated: true});
      }

      onClickAccueil(){
        
        // this.router.navigate(["./start-trip/index/"+ projet]);
        this.router.navigate(['./'] ); 
     }


}
