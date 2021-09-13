import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from "src/app/core/services/authentication.service";

@Component({
  selector: 'app-header-backend',
  templateUrl: './header-backend.component.html',
  styleUrls: ['./header-backend.component.css'],
  providers:[ AuthenticationService ]
})
export class HeaderBackendComponent implements OnInit {


  userData:any
  constructor(private authenticationService: AuthenticationService) { 
   
    this.userData = JSON.parse(localStorage.getItem("loginUser"));
  }

  ngOnInit(): void {

  }

  onLogout(){

    this.authenticationService.logout(true);
  }
 

}
