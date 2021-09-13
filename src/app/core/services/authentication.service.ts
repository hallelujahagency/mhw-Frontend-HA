import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from 'src/app/core/models/user';
import { Token } from 'src/app/core/models/token.model';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class AuthenticationService {
	public loginUser: Observable<User>;
	public loginToken: Observable<Token>;
	private currentUserSubject: BehaviorSubject<User>;
	private currentTokenSubject: BehaviorSubject<Token>;
	private apiUrl = environment.apiUrl;
	loginCurrentUser: any;
	userAccessToken: any;

	constructor(
		public router: Router,
		private http: HttpClient,
		//public toastrService: ToastrService,
	) {
		if(localStorage.getItem('loginUser')) {
			this.loginCurrentUser = JSON.parse(localStorage.getItem('loginUser'));
			this.userAccessToken = JSON.parse(localStorage.getItem('access_token'));
		}
		this.currentUserSubject = new BehaviorSubject<User>(this.loginCurrentUser);
		this.currentTokenSubject = new BehaviorSubject<Token>(this.userAccessToken);
		this.loginUser = this.currentUserSubject.asObservable();
		this.loginToken = this.currentTokenSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	public get currentTokenValue(): Token {
		return JSON.parse(localStorage.getItem('access_token'));
	}

	setLoginUser(user) {
		localStorage.setItem('loginUser', JSON.stringify(user));
		this.currentUserSubject.next(user);
	}



	getToken() {
		return localStorage.getItem("access_token")
	}

	isLoggedIn() {
		return this.getToken() !== null;
	}

	register(user: any) {
		//console.log(user);
		return this.http.request('post',`${this.apiUrl}auth/register`, {
			body:user,
			responseType:'json',
			observe: 'body'
		}).pipe(map((user:any) => {

			let data = {
				token: user.user.token,
				token_type: user.user.token_type,
				expires_in: user.user.expires_in
			}
				if (user) {
					localStorage.setItem('access_token', JSON.stringify(data));
					this.currentTokenSubject.next(data);
					this.setLoginUser(user.user.userData);
				}
				return user;
			}));
	}

	login(email: string, password: string) {

			return this.http.request('post', `${this.apiUrl}auth/login`,{
				body:{email:email, password:password},
				responseType:'json',
				observe: 'body'
			   })
			   .pipe(map((user:any) => {

				let data = {
					token: user.user.token,
					token_type: user.user.token_type,
					expires_in: user.user.expires_in
				}
					if (user) {
						localStorage.setItem('access_token', JSON.stringify(data));
						//localStorage.setItem('entreprise_ID', JSON.stringify(user.user.entreprise));
						this.currentTokenSubject.next(data);

						this.setLoginUser(user.user.userData);
					}
					return user;
				}));
	}

	postSocialLogin(data: any) {

		return this.http.request('post', `${this.apiUrl}auth/post-social-login`,{
			body:data,
			responseType:'json',
			observe: 'body'
		   })
		   .pipe(map((user:any) => {

			let data = {
				token: user.user.token,
				token_type: user.user.token_type,
				expires_in: user.user.expires_in
			}
				if (user) {
					localStorage.setItem('access_token', JSON.stringify(data));
					this.currentTokenSubject.next(data);

					this.setLoginUser(user.user.userData);
				}
				return user;
			}));
}

	forgotPassword(email) {
		return this.http.post(`${this.apiUrl}/api/forgot-password`, email);
	}

	getVerifyUser(data) {
		return this.http.post(`${this.apiUrl}/api/verify/user`, data);
	}

	getVerifyUserToken(data) {
		return this.http.post(`${this.apiUrl}/api/verify/token`, data);
	}

	resetPassword(data) {
		return this.http.post(`${this.apiUrl}/api/reset-password`, data);
	}

	logout(isheader = true) {
		  
		if (isheader) {
			//this.toastrService.success("Vous vous êtes déconnecté avec succès.");
		}

				localStorage.removeItem('loginUser');
				localStorage.removeItem('entreprise_ID');
			   localStorage.removeItem('access_token');
					setTimeout(() => {
						window.location.reload();
					  }, 200);
	}
}
