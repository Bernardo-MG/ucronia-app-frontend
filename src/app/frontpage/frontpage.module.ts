import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FrontpageRoutingModule } from './frontpage-routing.module';
import { FrontpageService } from './service/frontpage.service';



@NgModule({
  imports: [
    CommonModule,
    FrontpageRoutingModule,
    ArticleComponent
  ],
  providers: [
    FrontpageService
  ]
})
export class FrontpageModule { }
