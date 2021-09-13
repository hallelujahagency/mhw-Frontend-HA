import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'meetHalfwayFrontend';
  loginUser: any;

  constructor(
		public translate: TranslateService,
	//	public authenticationService: AuthenticationService
	) {

		

	/*	this.authenticationService.loginUser.subscribe(x => this.loginUser = x);

		if(this.loginUser) {
			// translate.setDefaultLang(this.loginUser.language);
			translate.use(this.loginUser.language);
		}else{
			translate.setDefaultLang('en');
			// translate.use('en');
		}

		if (localStorage.getItem("permissions") != 'undefined' && localStorage.getItem("permissions") != null) {
			authenticationService.setUserPermissions(JSON.parse(localStorage.getItem("permissions")));
		}
    */
		

   translate.setDefaultLang('fr');
	}

	
}
