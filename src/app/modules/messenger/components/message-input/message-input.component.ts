import { Component, OnInit, Input ,EventEmitter, Output,} from '@angular/core';
import { ApiDataService } from "src/app/core/services/api.service";
import { ApiSocketService } from "src/app/core/services/socket.service";
import { throttle } from "throttle-debounce";
declare var $;

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.css'],
  providers: [ApiDataService, ApiSocketService]
})
export class MessageInputComponent implements OnInit {

  @Input() conversationActive:any;
  @Output() onSendMessage: EventEmitter<any> = new EventEmitter();

  textMessage:any;

  userConnect:any;
  timer = null;


  constructor(private apiService: ApiDataService, private socket: ApiSocketService) { }
 

  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem("loginUser"));
  }


  writeText(event:any) {

    const val = event.target.value.trim();

    if( val === ""){
     return false;
    }
    this.textMessage = val;
    console.log(this.textMessage)
    
    
  }


  emojiClick(event:any) {

    this.textMessage += event;
    console.log(this.textMessage)
    
    
  }

     //send input write

    SendmessageChange(){
      console.log("Enter")
            if(this.conversationActive){
             let participant = this.conversationActive.my_participants.find(e=> e.user_id !== parseInt(this.userConnect.uuid));

           //  console.log(participant.my_participantsdata[0].uuid);

          throttle(3000, this.socket.socketMessageWriteTyping(this.conversationActive.uuid, participant.my_participantsdata[0].uuid));
            clearTimeout(this.timer);
            
              this.timer = setTimeout(() => {
                this.socket.socketMessageWriteTypingStop(this.conversationActive.uuid, participant.my_participantsdata[0].uuid);
              }, 3000);
            } 
        }


        // send message

        sendMessageText(){

         
          let dataSend = { 
            sender_id: parseInt(this.userConnect.uuid),
            message: this.textMessage,
            type:"text",
            conversation: this.conversationActive.uuid
          }
       
          

          this.apiService.sendmessageText(dataSend).subscribe(data=>{
              this.textMessage = "";

              this.onSendMessage.emit(data);

              
            });
        }

        //send image message

        onFileChange(event:any){

          if(event.target.files && event.target.files[0]){ 

            let files = event.target.files;
            const formData : any = new FormData();

                for (let index = 0; index < files.length; index++) {
 
                  formData.append("medias",files[index] ) ;
                  
                }

                formData.append("type","medias" );
                let sender = parseInt(this.userConnect.uuid);

                formData.append("sender_id",sender );
                formData.append("message",null );
                formData.append("conversation",this.conversationActive.uuid );

                this.apiService.sendmessageMediasVideo(formData).subscribe(data=>{
                      this.textMessage = "";
        
                      this.onSendMessage.emit(data);
    
                  
                });


          }
        }


        imageUplaod(){
          $('.post-images-upload').trigger('click');
         }

}
