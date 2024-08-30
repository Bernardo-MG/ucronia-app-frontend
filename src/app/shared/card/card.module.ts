import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardBodyComponent } from './components/card-body/card-body.component';
import { CardFooterComponent } from './components/card-footer/card-footer.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardNavigationComponent } from './components/card-navigation/card-navigation.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    CardFooterComponent,
    CardNavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    CardFooterComponent,
    CardNavigationComponent
  ]
})
export class CardModule { }
