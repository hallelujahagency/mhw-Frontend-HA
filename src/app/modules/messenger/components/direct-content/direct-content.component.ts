import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ApiSocketService } from "src/app/core/services/socket.service";
import { environment } from "src/environments/environment";
declare var $;

@Component({
  selector: 'app-direct-content',
  templateUrl: './direct-content.component.html',
  styleUrls: ['./direct-content.component.css'],
  providers: [ApiSocketService]
})
export class DirectContentComponent implements OnInit {

  @Input()  Cardprofil:any;
  @Input()  conversationActive:any;
  userConnect:any;
  typing:boolean = false;

  urlBack:string= environment.apiUrlSocket+"/";

  constructor(private socket : ApiSocketService) { }

  ngOnInit(): void { 
    this.userConnect = JSON.parse(localStorage.getItem("loginUser"));
    this.userConnect.uuid = parseInt(this.userConnect.uuid);
    this.getstatutAllusers();
    this.getStatutTyping()
  }

  getstatutAllusers(){

    if(!this.Cardprofil){
      return;
    }
    
    this.socket.socketStatutuser().subscribe(data=>{

      if(this.Cardprofil.uuid === data.userId){
        this.Cardprofil.statut =  data.activityStatus;
      }

    })
  }

  getStatutTyping(){
    this.socket.socketStatutTyping().subscribe(data=>{
     // console.log(data);

      if(this.conversationActive.uuid === data.conversation){
        this.typing = data.statut;
      }
    })
  }

  getOpenClose(){

            $('body').toggleClass('menu-active'); //add class
            $('.app-sidebar').toggleClass('active'); //remove
            $('.chitchat-main').toggleClass("small-sidebar"); //remove
            if($( window ).width() <= 1440 ) {
                $('.chitchat-container').toggleClass('sidebar-overlap');
              $('.chitchat-main').addClass("small-sidebar"); //remove
          }
          if ($('body').hasClass('menu-active')) {
          // $('body').addClass('sidebar-active main-page');
          $('body').addClass('main-page');//custom
            $('.app-sidebar').removeClass('active');
            $('.chitchat-main').removeClass("small-sidebar");
        }
  }

  getFile(file:string){
    return this.urlBack+file;
  }


}
