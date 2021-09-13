import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderFrontendComponent } from './header-frontend/header-frontend.component';
import { FrontendLayoutComponent } from './frontend-layout/frontend-layout.component';
import { FooterFrontendComponent } from './footer-frontend/footer-frontend.component';
import { HeaderBackendComponent } from './header-backend/header-backend.component';
import { FooterBackendComponent } from './footer-backend/footer-backend.component';
import { BackendLayoutComponent } from './backend-layout/backend-layout.component';
import { SidebarLeftMessengerComponent } from './sidebar-left-messenger/sidebar-left-messenger.component';
import { SidebarRightMessengerComponent } from './sidebar-right-messenger/sidebar-right-messenger.component';



@NgModule({
  declarations: [HeaderFrontendComponent, FrontendLayoutComponent,
     FooterFrontendComponent, HeaderBackendComponent, FooterBackendComponent, 
     BackendLayoutComponent, SidebarLeftMessengerComponent, SidebarRightMessengerComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		}),
  ],
  exports: [
    FrontendLayoutComponent,
    BackendLayoutComponent
	]
})
export class LayoutsModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
