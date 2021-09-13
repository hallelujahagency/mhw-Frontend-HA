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
export class DestinationsService {
  constructor(private http: HttpClient) { }

  getdestinations(lat:any,lng:any,radius:number): Observable<any> 
  {
   const url = environment.googleApi + '&location='+lat+','+ lng+'&radius='+ radius +'&type=train_station&keyword=Gare';

   return this.http.get(url)
     .pipe(
       map((res: any) => {
         return res;
       }),
       catchError(errorRes => {
         return throwError(errorRes);
       })
     );
 }

}
