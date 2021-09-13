import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from "./blog-routing.module";
import { SharedModule } from 'src/app/shared/shared.module';
import { DefaultPageComponent } from './default-page/default-page.component';



@NgModule({
  declarations: [DefaultPageComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ]
})
export class BlogModule { }
