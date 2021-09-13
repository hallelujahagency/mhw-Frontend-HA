import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationsDetailsComponent } from './components/destinations-details/destinations-details.component';
import { DefaultComponent } from './pages/default/default.component';
import { PaiementRoutingModule } from "./paiement-routing.module";



@NgModule({
  declarations: [DestinationsDetailsComponent, DefaultComponent],
  imports: [
    CommonModule,
    PaiementRoutingModule
  ]
})
export class PaiementModule { }
