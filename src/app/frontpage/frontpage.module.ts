import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontpageRoutingModule } from './frontpage-routing.module';
import { HighlightsComponent } from './highlights/highlights.component';



@NgModule({
  declarations: [
    HighlightsComponent
  ],
  imports: [
    CommonModule,
    FrontpageRoutingModule
  ]
})
export class FrontpageModule { }
