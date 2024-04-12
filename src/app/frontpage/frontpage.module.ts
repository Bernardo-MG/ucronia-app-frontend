import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { FrontpageRoutingModule } from './frontpage-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FrontpageRoutingModule,
    ArticleComponent
  ]
})
export class FrontpageModule { }
