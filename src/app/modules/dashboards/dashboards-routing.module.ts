import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';



const routes: Routes = [
	{
		path: '', 
		component: DefaultComponent
		/*children: [
			{ path: '', redirectTo: 'Tableau-de-bord', pathMatch: 'full' },
			
			{
				path: 'Tableau-de-bord',
				component: DefaultComponent
			}
		]*/
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class DashboardsRoutingModule { }
