import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { DefaultComponent } from './pages/default/default.component';



@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { }
