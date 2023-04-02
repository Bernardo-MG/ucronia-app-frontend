import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from './buttons/buttons.module';
import { IconsModule } from './icons/icons.module';
import { PaginationModule } from './pagination/pagination.module';



@NgModule({
  imports: [
    ButtonsModule,
    CommonModule,
    IconsModule,
    PaginationModule
  ]
})
export class SharedModule { }
