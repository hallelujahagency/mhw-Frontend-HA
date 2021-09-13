import { BrowserModule , Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutsModule } from "./core/layouts/layouts.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeEn);
registerLocaleData(localeEs);
registerLocaleData(localeFr);

import { ToastrModule } from 'ngx-toastr';

import { HttpConfigInterceptor } from './core/interceptor/http-config.interceptor';
import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";
import { ContactComponent } from './modules/contact/contact.component';
 



@NgModule({
  declarations: [ 
    AppComponent, ContactComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
		HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SocialLoginModule,
    LayoutsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation:'decreasing'
    }),
    
    TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient]
			}
		})
  ],
  providers: [Title, { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '260908153478-m7523lfpak4fgkofik8een815e1418ac.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('365844568498558')
          }
        ]
      } as SocialAuthServiceConfig,
    }
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }



// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
