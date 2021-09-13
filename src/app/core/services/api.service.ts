import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError,Observable } from 'rxjs';
import { environment } from '../../../environments/environment';



 



@Injectable({ providedIn: 'root' })
export class ApiDataService { 
  constructor(private http: HttpClient) { }



  getDestinations(lat:any,lng:any,radius:number): Observable<any> 
  {
   const url = environment.apiUrl+"destinations/get-destinations";

   return this.http.post(url, {lat:lat, lng:lng, rayon:radius})
     .pipe(
       map((res: any) => {
         return res;
       }),
       catchError(errorRes => {
         return throwError(errorRes);
       })
     );
 }

 getStations(): Observable<any> 
 {
  const url = environment.apiUrl+"destinations/liste-stations";

  return this.http.post(url, {})
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
}

saveProject(data:any): Observable<any> 
{
 const url = environment.apiUrl+"projects/save-project";

 return this.http.post(url, data)
   .pipe(
     map((res: any) => {
       return res;
     }),
     catchError(errorRes => {
       return throwError(errorRes);
     })
   );
}


getProject(project:string): Observable<any> 
  {
  const url = environment.apiUrl+"projects/get-project";

  return this.http.post(url, {project:project})
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

getProjects(): Observable<any> 
  {
  const url = environment.apiUrl+"projects/get-all-projects";

  return this.http.post(url, {})
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  saveRating(data:any): Observable<any> 
  {
  const url = environment.apiUrl+"projects/save-rating";

  return this.http.post(url, data)
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  checkRating(data:any): Observable<any> 
  {
  const url = environment.apiUrl+"projects/check-rating";

  return this.http.post(url, data)
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getRatingsByProject(data:any): Observable<any> 
  {
  const url = environment.apiUrl+"projects/get-ratings-by-project";

  return this.http.post(url, data)
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getVideoANdEventsByVille(data:any): Observable<any> 
  {
  const url = environment.apiUrl+"projects/get-video-and-events-for-ville";

  return this.http.post(url, data)
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }


  getConversations(): Observable<any> 
  {
  const url = environment.apiUrl+"messagerie/get-conversations";

  return this.http.post(url, {})
    .pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }





  //send message type text

sendmessageText(paramsData:any){ 

  const url = environment.apiUrl +'messagerie/send-message-text';
  return this.http.request('post', url,{
      body: paramsData,
      responseType:'json',
      observe: 'body'
     }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
}


  //send message type text

  sendmessageMediasVideo(paramsData:any){ 

    const url = environment.apiUrl +'messagerie/send-message-photos-and-video';
    return this.http.request('post', url,{
        body: paramsData,
        responseType:'json',
        observe: 'body'
       }).pipe(
        map((res: any) => {
          return res;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }


getUsersBySearch(paramsData:any){ 

  const url = environment.apiUrl +'messagerie/get-users-search';
  return this.http.request('post', url,{
      body: paramsData,
      responseType:'json',
      observe: 'body'
     }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
}


createConversation(paramsData:any){ 

  const url = environment.apiUrl +'messagerie/create-conversation';
  return this.http.request('post', url,{
      body: paramsData,
      responseType:'json',
      observe: 'body'
     }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
}

sendMailToParticipants(paramsData:any){ 

  const url = environment.apiUrl +'projects/send-mail';
  return this.http.request('post', url,{
      body: paramsData,
      responseType:'json',
      observe: 'body'
     }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
}

   


}