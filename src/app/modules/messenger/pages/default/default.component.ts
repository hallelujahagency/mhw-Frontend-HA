import { Component, OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import { StyleManagerService } from "src/app/core/services/style-manager.service";
import { ApiDataService } from "src/app/core/services/api.service";
import { ApiSocketService } from "src/app/core/services/socket.service";
declare var $;

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers:[StyleManagerService,ApiDataService, ApiSocketService]
})
export class DefaultComponent implements OnInit,OnDestroy {


  constructor(private styleManager: StyleManagerService,
              private apiUrl: ApiDataService,
              private socket: ApiSocketService) { }


  activeTab:string ="blank";
  activeChatUuid:any;
  profilTab ={
    name:null,
    type:null,
    statut:null,
    img:null
  };
  userOtherDirect:any;

  itemsDirect:any=[
    {
      index:0,
      img:"assets/images/contact/1.jpg",
      name: "Josephin water",
      msg:"Hi, i am josephin. How are you.. ! There are many variations of passages.",
      date:"22/10/19",
      seen:true,
      notReadNumber:0,
      userConnecte:false
    },

    {
      index:1,
      img:"assets/images/contact/2.jpg",
      name: "Jony Lynetin",
      msg:"Hi, i am josephin. How are you.. ! There are many variations of passages.",
      date:"30/11/19",
      seen:false,
      notReadNumber:8,
      userConnecte:true
    }
  ];

  itemsGroup:any=[
    {
      index:0,
      img:"assets/images/avtar/teq.jpg",
      title: "Tech Ninjas",
      msg:"Lorem Ipsum is simply dummy text the printing and typesetting industry.",
     
    },

    {
      index:1,
      img:"assets/images/avtar/family.jpg",
      title: "Family Ties",
      msg:"Lorem Ipsum is simply dummy text the printing and typesetting industry.",
     
    }
  ];

  

  directsConversations:any;
  userConnect:any;
  conversationActive:any;



  ngOnInit(): void {
    this.userConnect = JSON.parse(localStorage.getItem("loginUser"));
    this.getConversations();
    this.styleManager.setStyle("styleMessenger","assets/css/styleMessenger.css");
   this.loadScript();
   this.getMessages();
   this.getConversationSocket();
   

    setTimeout(() => {
      
      $(".chitchat-container").css("visibility","visible");
  
    }, 1000);
  }



  loadScript() {

              const url = "assets/js/script.js";
              const Bootstrap = "assets/js/bootstrap.js";

              let nodeBoostrap = document.createElement('script');
              nodeBoostrap.src = Bootstrap;
              nodeBoostrap.type = 'text/javascript';
              nodeBoostrap.async = true;
              nodeBoostrap.classList.add('script-manager-messenger-bootstrap');
              document.getElementsByTagName('head')[0].appendChild(nodeBoostrap);

              let node = document.createElement('script');
              node.src = url;
              node.type = 'text/javascript';
              node.async = true;
              node.classList.add('script-manager-messsenger');
              document.getElementsByTagName('head')[0].appendChild(node);
 
 }

 getConversations(){

  this.apiUrl.getConversations().subscribe(data=>{
    this.directsConversations=[];
     
       data.forEach(item => {

            if(item.conversationdata[0].type === "direct"){
              this.directsConversations.push(item.conversationdata[0])
            }
         
       });

  })
 }

 getConversationSocket(){

  this.socket.socketConversation().subscribe(data=>{

   // console.log(data);

    if((data.conversationdata[0].my_participants.findIndex(e=> e.user_id === parseInt(this.userConnect.uuid))) > -1){

      switch (data.conversationdata[0].type) {
        case "direct":
          this.directsConversations.push(data.conversationdata[0]);
         // console.log(data.conversationdata[0]);
          break;
      
        default:
          break;
      }
    }

  

  })
 }

  onCreateConversation(event: any) {

    this.apiUrl.createConversation(event).subscribe(data => {

      console.log(data)
    })

  }


 removeScript() {
      const existingScriptElement = document.head.querySelector('script-manager-messsenger');
      const existingScriptElementBoostrap = document.head.querySelector(`script-manager-messenger-bootstrap`);
      
            if (existingScriptElement ) {
            document.head.removeChild(existingScriptElement);
            document.head.removeChild(existingScriptElementBoostrap);
          }

    
 }



 onClickDirect(event:any){

  this.activeTab = event.type;
  this.activeChatUuid = event.index;

 this.conversationActive = this.directsConversations.find(e=> e.uuid === this.activeChatUuid && e.type === this.activeTab);


 let participant = this.conversationActive.my_participants.find(e=> e.user_id !== parseInt(this.userConnect.uuid));



 switch (this.activeTab) {

   case "direct":
    this.profilTab.name = participant.my_participantsdata[0].fullname;
    this.profilTab.img = participant.my_participantsdata[0].photo;
    this.profilTab.statut = participant.my_participantsdata[0].statut;
    this.userOtherDirect =participant.my_participantsdata[0];
    this.profilTab.type = this.activeTab;
     break;
 
   default:
     break;
 }

// console.log(this.conversationActive)
$(".messages").animate({ scrollTop: $(document).height() }, "fast");



 }


 onSendMessage(event:any){

        $(".messages").animate({ scrollTop: $(document).height() }, "fast");

 }

 getMessages(){
   this.socket.socketMessage().subscribe((data)=>{

   // console.log(data);

   
            let index = this.directsConversations.findIndex(e=> e.uuid === parseInt(data.conversation_id));

            if(index > -1){


                      if(this.directsConversations[index].messages !== null){

                        data.conversation_id = parseInt(data.conversation_id);
                        data.uuid = parseInt(data.uuid);
                        data.sender_id = parseInt(data.sender_id);
                        

                        this.directsConversations[index].messages.push(data);
                      }

                      else{

                        this.directsConversations[index].messages = [];

                        data.conversation_id = parseInt(data.conversation_id);
                        data.uuid = parseInt(data.uuid);
                        data.sender_id = parseInt(data.sender_id);
                        

                        this.directsConversations[index].messages.push(data);
                      }

            }

               

    


   })
 }

  
  ngOnDestroy(){

    this.styleManager.removeStyle("styleMessenger");
    this.removeScript();

  }

}
 