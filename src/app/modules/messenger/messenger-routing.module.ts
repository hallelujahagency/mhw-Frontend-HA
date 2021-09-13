import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './pages/default/default.component';



const routes: Routes = [
	{
		path: '', 
		component: DefaultComponent
		/*children: [
			{ path: '', redirectTo: 'list-projects', pathMatch: 'full' },
			
			{
				path: 'list-projects',
				component: ListProjectsComponent
			}
		]*/
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class MessengerRoutingModule { }
