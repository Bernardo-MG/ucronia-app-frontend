import { NgModule } from '@angular/core';
import { FrontpageRoutingModule } from './frontpage-routing.module';
import { FrontpageService } from './service/frontpage.service';



@NgModule({
  imports: [
    FrontpageRoutingModule
  ],
  providers: [
    FrontpageService
  ]
})
export class FrontpageModule { }
