import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AssociationStatsModule } from '@app/association/stats/association-stats.module';
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
    AssociationStatsModule,
    LayoutModule
  ]
})
export class FrontpageModule { }
