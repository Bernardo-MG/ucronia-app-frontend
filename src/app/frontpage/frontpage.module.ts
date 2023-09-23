import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FrontpageRoutingModule } from './frontpage-routing.module';
import { HighlightsComponent } from './highlights/highlights.component';



@NgModule({
  declarations: [
    HighlightsComponent
  ],
  imports: [
    CommonModule,
    FrontpageRoutingModule,
    LayoutModule
  ]
})
export class FrontpageModule { }
