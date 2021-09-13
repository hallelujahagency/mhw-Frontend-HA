import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError,Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Socket } from 'ngx-socket-io';


@Injectable({ providedIn: 'root' })
export class ApiSocketService { 
  constructor(private http: HttpClient, private socket: Socket) { }

  socketStatutuser(){ 
                
    return this.socket.fromEvent<any>("activityStatusUpdate")
    .pipe(map((data)  => data));
  }

  socketMessage(){ 
          
    return this.socket.fromEvent<any>("newMessage")
    .pipe(map((data)  => data));
  }

  socketConversation(){ 
          
    return this.socket.fromEvent<any>("newConversation")
    .pipe(map((data)  => data));
  }
  


  
  socketMessageWriteTyping(conversation:number, userId:number){ 
      
    this.socket.emit("typing",{ conversation: conversation, userId: userId, statut:true })
  }

  socketMessageWriteTypingStop(conversation:number, userId:number){ 
      
  //  this.socket.emit("stoppedTyping",{ conversation: conversation, userId: userId })
  this.socket.emit("typing",{ conversation: conversation, userId: userId, statut:false })
  }

  socketStatutTyping(){ 
    return this.socket.fromEvent<any>("typing")
    .pipe(map((data)  => data));
  }
  socketStatutStopTyping(){ 
    return this.socket.fromEvent<any>("stoppedTyping")
    .pipe(map((data)  => data));
  }

}