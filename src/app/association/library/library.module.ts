import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';
import { LibraryRoutingModule } from './library-routing.module';



@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    LibraryFrontpageComponent
  ]
})
export class LibraryModule { }
