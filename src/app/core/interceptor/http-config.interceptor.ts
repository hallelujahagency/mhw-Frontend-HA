import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()

export class HttpConfigInterceptor implements HttpInterceptor {
	
	/**
	 *	@class HttpConfigInterceptor
	 *	@constructor
	*/
	constructor(
		public router: Router,
		public toastrService: ToastrService,
		public authenticationService: AuthenticationService,
	) { }

	/**
	 *	Transform the outgoing request before passing it to the next interceptor in the chain, by calling next.handle() method
	 *
	 *	@class HttpConfigInterceptor
	 *	@method intercept
	 *	@param {request} request
	 *	@param {next} httpHandler
	*/
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let loginToken = this.authenticationService.currentTokenValue;
		
		// --
		// Check expiration token
		if (loginToken) {
			if (loginToken.expires_in && (Date.now() > (Date.now() + loginToken.expires_in))) {
				this.toastrService.error('Jeton expire reconnectez vous');
				this.authenticationService.logout();
			}

			request = request.clone({ headers: request.headers.set('Authorization', loginToken.token_type + ' ' + loginToken.token) });
		}

		

		request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
		

				switch (error.status) {
					
					case 400:							
							this.toastrService.error(error.error.message, "Mauvaise Demande");
						break;
					case 401:
						this.toastrService.error(error.error.message, "Erreur de connexion");
						this.authenticationService.logout(false);
						break;
					case 403:
						this.toastrService.error("Vous ne disposez peut-être pas des autorisations appropriées pour accéder au fichier ou aux ressources.", "L'accès est refusé");
						break;
					case 404:
						this.toastrService.error("Désolé, mais la page que vous cherchiez est introuvable.", "Pas trouvé");
						break;
					case 501:
							this.toastrService.error("Désolé, vous avez deja effectue cette action", "Deja trouvé");
							break;
					case 500:
						this.toastrService.error(error.error.message, "Quelque chose s'est mal passé!");
						break;
					default:
						
						break;
				}
				return throwError(error);
			}));
	}
}