import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
