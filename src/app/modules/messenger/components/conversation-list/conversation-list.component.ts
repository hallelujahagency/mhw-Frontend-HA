import { Component, OnInit,EventEmitter, Output, Input, } from '@angular/core';
import { ApiSocketService } from "src/app/core/services/socket.service";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'],
  providers: [ ApiSocketService]
})
export class ConversationListComponent implements OnInit {

  @Input() direct:any;
  @Input() directItemActive:any;
  @Input() groupItemActive:any;
  @Output() onClickSidebar: EventEmitter<any> = new EventEmitter();
  userConnect:any;
  typing:boolean=false;
  participantDirectData:any;

  constructor(private socket: ApiSocketService) { }

  ngOnInit(): void {

    this.userConnect = JSON.parse(localStorage.getItem("loginUser"));
    this.getstatutAllusers();
    this.getStatutTyping();
  }

  getstatutAllusers(){

    if(this.direct){
      //console.log(this.direct);
      this.socket.socketStatutuser().subscribe(data=>{

        let index =   this.direct.my_participants.findIndex(m=> m.user_id ===  data.userId);

        if( index > -1){
          this.direct.my_participants[index].my_participantsdata[0].statut = data.activityStatus;
        }

    })
    }
    

  }

  getStatutTyping(){
    this.socket.socketStatutTyping().subscribe(data=>{
     // console.log(data);

      if(this.direct.uuid === data.conversation){
        this.typing = data.statut;
      }
    })
  }


  onClickSidebarTrans(){

    
    let data= {
      type:this.direct.type,
      index:this.direct.uuid

    }
    this.onClickSidebar.emit(data);

  }

  UserIfconnect(){

         if(this.direct){
            let participant = this.direct.my_participants.find(e=> e.user_id !== parseInt(this.userConnect.uuid));

            if(participant.my_participantsdata){
              
                  if(participant.my_participantsdata[0].statut !== "En ligne"){
                    return false;
                  }
              
                  else{
                    return true;
                  }
            }

         }

    



}

UserDataName(){

    if(this.direct){
        let participant = this.direct.my_participants.find(e=> e.user_id !== parseInt(this.userConnect.uuid));
        
        if(participant.my_participantsdata){
          //console.log(participant.my_participantsdata);
          return participant.my_participantsdata[0].fullname;
        }
    }


}

UserDataPhoto(){

    if(this.direct){
      let participant = this.direct.my_participants.find(e=> e.user_id !== parseInt(this.userConnect.uuid));

      if(participant.my_participantsdata){
        //console.log(participant.my_participantsdata);
        return participant.my_participantsdata[0].photo;
      }
     
    }

}

    Messagelast(data:any){

  
      let message ="" ;

      if(data === null || !data.length){
        return message;
      }

      let messageData;

      if(data.length > 1){
        messageData = data[data.length - 1];
      }
      else{
        messageData = data[0];
      }
     

      if(messageData.sender_id === parseInt(this.userConnect.uuid)){
        message += "Vous: ";

      }


      switch (messageData.message_type) {
        case "text":
          message += messageData.message;
          break;

          case "medias":
          message += "Photos";
          break;

          case "video":
            message += "Vidéo";
            break;

            case "doc":
              message += "Document";
              break;
      
        default:
          break;
      }

      
      return message;


  }

  MessagelastDate(data:any){

   // console.log(data)

    if(data === null || !data.length){
      return null;
    }

    let messageData;

    if(data.length > 1){
      messageData = data[data.length - 1];
    }
    else{
      messageData = data[0];
    }
   // let messageData = data[data.length - 1];

    return messageData.created_at



}


}
