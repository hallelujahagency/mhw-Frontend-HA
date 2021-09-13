import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessengerRoutingModule } from "./messenger-routing.module";
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { DefaultComponent } from './pages/default/default.component';
import { MessagesBlankComponent } from './components/messages-blank/messages-blank.component';
import { MessagesContentComponent } from './components/messages-content/messages-content.component';
import { DirectContentComponent } from './components/direct-content/direct-content.component';
import { GroupContentComponent } from './components/group-content/group-content.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from "src/environments/environment";
import {CrystalLightboxModule} from '@crystalui/angular-lightbox';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';


let token = null;
if(localStorage.getItem("access_token")){

  token = JSON.parse(localStorage.getItem("access_token")).token;
}

const config: SocketIoConfig = { url: environment.apiUrlSocket, options: {query: { token:  token },  autoConnect: true} };

 

@NgModule({
  declarations: [SidebarRightComponent,SidebarLeftComponent, MessageInputComponent, DefaultComponent, MessagesBlankComponent, MessagesContentComponent, DirectContentComponent, GroupContentComponent, ConversationListComponent],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    FormsModule,
    CrystalLightboxModule,
    SocketIoModule.forRoot(config),
    MomentModule
    
  ]
})
export class MessengerModule { }
