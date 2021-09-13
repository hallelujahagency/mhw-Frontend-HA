import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from "@angular/router";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
defineLocale('fr', frLocale);


import { TravelerStepsRoutingModule } from './traveler-steps-routing.module';
import { TravelersInfosComponent } from './steps/travelers-infos/travelers-infos.component';
import { TravelerCardInfoComponent } from './components/traveler-card-info/traveler-card-info.component';
import { PeriodeCalendarComponent } from './steps/periode-calendar/periode-calendar.component';
import { DestinationsComponent } from './steps/destinations/destinations.component';
import { CustomWizardComponent } from './steps/custom-wizard/custom-wizard.component';
import { CardDestinationComponent } from './components/card-destination/card-destination.component';
import { TravelerDetailsComponent } from './components/traveler-details/traveler-details.component';
import { HebergementsComponent } from './hebergements/hebergements.component';
import { FilterCardComponent } from './components/filter-card/filter-card.component';



@NgModule({
  declarations: [TravelersInfosComponent, TravelerCardInfoComponent, PeriodeCalendarComponent, DestinationsComponent, CustomWizardComponent, CardDestinationComponent, TravelerDetailsComponent, HebergementsComponent, FilterCardComponent],
  imports: [
    CommonModule,
    TravelerStepsRoutingModule,
    SharedModule,
    FormsModule,
    NgxTypeaheadModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule,
    RouterModule,
    TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: (HttpLoaderFactory),
				deps: [HttpClient]
			}
		}),
  ]
})
export class TravelerStepsModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}


