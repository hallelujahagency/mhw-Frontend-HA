import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProjectsComponent } from './list-projects/list-projects.component';



const routes: Routes = [
	{
		path: '', 
		children: [
			{ path: '', redirectTo: 'list-projects', pathMatch: 'full' },
			
			{
				path: 'list-projects',
				component: ListProjectsComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ProjectsRoutingModule { }
