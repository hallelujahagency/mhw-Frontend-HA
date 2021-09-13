import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { FrontendLayoutComponent } from './core/layouts/frontend-layout/frontend-layout.component';
import { BackendLayoutComponent } from "./core/layouts/backend-layout/backend-layout.component";
import { GuestGuard} from './core/services/gest-guard.service';
import { AuthGuardService} from './core/services/auth-guard.service';
import { ContactComponent } from './modules/contact/contact.component';

const routes: Routes = [

  {
		path: '',
		redirectTo: 'accueil',
		pathMatch: 'full'
	},
  {
		path: '', component: FrontendLayoutComponent,
		children: [
      		{
				path: 'accueil',
				pathMatch: 'full',
				loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
				data: {
					title: 'accueil.title'
				}
			},
			{
				path: 'start-trip',
				loadChildren: () => import('./modules/traveler-steps/traveler-steps.module').then(m => m.TravelerStepsModule),
				data: {
					title: 'accueil.title'
				},
			//	pathMatch: 'full' // 'full' will not trigger child routes
			},

			{
				path: 'paiement',
				loadChildren: () => import('./modules/paiement/paiement.module').then(m => m.PaiementModule),
				data: {
					title: 'accueil.title'
				},
				canActivate:[AuthGuardService]
				//pathMatch: 'full' // 'full' will not trigger child routes
			},

			
			{
				path: 'blog',
				loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule),
				
			},

			{
				path: 'nous-contacter',
				component: ContactComponent
				
			},
		]
	},

	{
		path: 'user', component: BackendLayoutComponent,
		canActivate:[AuthGuardService],
		children: [
			{
				path: 'Tableau-de-bord',
				pathMatch: 'full',
				loadChildren: () => import('./modules/dashboards/dashboards.module').then(m => m.DashboardsModule),
				data: {
					title: 'accueil.title'
				},
				
			},
			{
				path: 'Projects',
				//pathMatch: 'prefix',
				loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule)
			}
		]
	}, 

	{
		path: 'messenger',
		//pathMatch: 'prefix',
		loadChildren: () => import('./modules/messenger/messenger.module').then(m => m.MessengerModule),
		canActivate:[AuthGuardService]
	},

	{
		path: '**',
		redirectTo: 'accueil',
		pathMatch: 'full'
	},
  
];

const config: ExtraOptions = {
	/*  useHash: true,  */
	scrollPositionRestoration: 'top'
};

@NgModule({
  imports: [RouterModule.forRoot(routes,config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
