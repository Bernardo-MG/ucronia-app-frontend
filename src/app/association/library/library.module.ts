import { NgModule } from '@angular/core';
import { LibraryRoutingModule } from './library-routing.module';
import { BookService } from './services/book.service';



@NgModule({
  imports: [
    LibraryRoutingModule
  ],
  providers: [
    BookService
  ]
})
export class LibraryModule { }
