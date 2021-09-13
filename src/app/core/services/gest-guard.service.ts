import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import { AuthenticationService } from "./authentication.service";



@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate{

    isLogged:boolean;

    constructor(public router: Router,private authenticationService: AuthenticationService){
        this.isLogged = this.authenticationService.isLoggedIn();
    }

    canActivate():boolean{
       

            if(this.isLogged){
                this.router.navigate(['/']);
                return false;
            }
            return true;
                }
}