import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/*
	import { TravelersInfosComponent } from './steps/travelers-infos/travelers-infos.component';
	import { PeriodeCalendarComponent } from './steps/periode-calendar/periode-calendar.component';
	import { DestinationsComponent } from './steps/destinations/destinations.component';
*/
import { CustomWizardComponent } from './steps/custom-wizard/custom-wizard.component';
import { HebergementsComponent } from './hebergements/hebergements.component';

const routes: Routes = [


	{
		path: 'index',
		component:  CustomWizardComponent ,
	
	},
	{
		path: 'hebergement',
		component:  HebergementsComponent ,
	
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class TravelerStepsRoutingModule { }
