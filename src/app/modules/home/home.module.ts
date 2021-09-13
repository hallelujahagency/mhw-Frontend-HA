import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {NgxTypedJsModule} from 'ngx-typed-js';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderBrandAreaComponent } from './components/header-brand-area/header-brand-area.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CitiesFeatureComponent } from './components/cities-feature/cities-feature.component';
import { WhyChooseComponent } from './components/why-choose/why-choose.component';
import { OurConceptVideoComponent } from './components/our-concept-video/our-concept-video.component';
import { ProcesConceptComponent } from './components/proces-concept/proces-concept.component';

 

@NgModule({
  declarations: [HeaderBrandAreaComponent, PageHomeComponent, CitiesFeatureComponent, WhyChooseComponent, OurConceptVideoComponent, ProcesConceptComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxTypedJsModule,
    RouterModule,
    SharedModule,
    TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		}),
  ]
})
export class HomeModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
