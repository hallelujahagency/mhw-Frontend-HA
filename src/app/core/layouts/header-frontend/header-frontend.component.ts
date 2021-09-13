import { Component, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "src/app/core/services/authentication.service";
import { ApiDataService } from "src/app/core/services/api.service";
import { first } from 'rxjs/operators';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-header-frontend',
  templateUrl: './header-frontend.component.html',
  styleUrls: ['./header-frontend.component.css'],
  providers: [ AuthenticationService,ApiDataService]
})
export class HeaderFrontendComponent implements OnInit {

  modalRef: BsModalRef;
  modalRefFor: BsModalRef;

  isLogged:boolean = false;
  seeDropdownUser:boolean = false;

  fieldTextTypeLogin:boolean;
  fieldType:string = "password" ;

  loginForm: FormGroup;
	isFormSubmitted = false;

  
  registerForm: FormGroup;
	isFormRegisterSubmitted = false;
  CurrentUser:any;

  userIsLogin:boolean = false ;
  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private socialAuth: SocialAuthService,
              private apiUrl: ApiDataService) { }

  ngOnInit(): void {
    this.loadForm();
    this.isLogged = this.authenticationService.isLoggedIn();

    if(localStorage.getItem('loginUser')){
      this.CurrentUser = JSON.parse(localStorage.getItem('loginUser'));
    }
  }

  loadForm() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
		});

    this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required]],
      fullname: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
		});
	}

  get userControl() { return this.loginForm.controls; }

  get userRegisterControl() { return this.registerForm.controls; }


  openModal(template: TemplateRef<any>, close:boolean=false) {
    if(close){
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template, {animated: true});
  }




  onSubmitLogin() {
		this.isFormSubmitted = true;
		if (this.loginForm.invalid) {
			return;
		}

		this.authenticationService.login(this.userControl.email.value, this.userControl.password.value)
			.pipe(first())
			.subscribe(
				data => {
          this.CurrentUser = JSON.parse(localStorage.getItem('loginUser'));
            this.isLogged = true;
            this.modalRef.hide();
				});
	}

  onSubmitRegister() {

   
		this.isFormRegisterSubmitted = true;
		if (this.registerForm.invalid) {
			return;
		}

    let dataSend ={
      email:this.userRegisterControl.email.value,
      password:this.userRegisterControl.password.value,
      fullname: this.userRegisterControl.fullname.value

    }

   // console.log(dataSend);

		this.authenticationService.register(dataSend)
			.pipe(first())
			.subscribe(
				data => {
          this.CurrentUser = JSON.parse(localStorage.getItem('loginUser'));
            this.isLogged = true;
            this.modalRef.hide();
            console.log("Ok");
				});
	}

  toggleFieldTextTypeLogin(){
    this.fieldTextTypeLogin = !this.fieldTextTypeLogin;
        if(this.fieldType == "text"){
            this.fieldType = "password";
        }
        else{ 
           this.fieldType = "text";
        }
   }

   onLogout(){

    this.authenticationService.logout(true);
  }

  socialConnect(provider:string){

    switch (provider) {
      case "google":
        this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID);
        break;
    
      case "facebook":
          this.socialAuth.signIn( FacebookLoginProvider.PROVIDER_ID);
          break;
    }

      this.socialAuth.authState.subscribe((user)=>{

       // console.log(user);

        let dataSend ={
          email:user.email,
          provider:user.provider,
          photo: user.photoUrl,
          fullname: user.name
    
        }

        this.authenticationService.postSocialLogin(dataSend)
          .pipe(first())
          .subscribe(
            data => {
              
                this.isLogged = true;
                this.CurrentUser = JSON.parse(localStorage.getItem('loginUser'));
                this.modalRef.hide();
                console.log("Ok");
            });

          })
  }


  seeProfilDropdown(){

    this.seeDropdownUser = !this.seeDropdownUser;
  }

}
