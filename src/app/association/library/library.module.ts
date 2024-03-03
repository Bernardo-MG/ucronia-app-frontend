import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';



@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    LibraryFrontpageComponent
  ]
})
export class LibraryModule { }
