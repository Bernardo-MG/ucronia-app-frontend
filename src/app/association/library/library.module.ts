import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';
import { LibraryRoutingModule } from './library-routing.module';
import { AuthorService } from './services/author.service';
import { BookTypeService } from './services/book-type.service';
import { BookService } from './services/book.service';
import { GameSystemService } from './services/game-system.service';
import { PublisherService } from './services/publisher.service';



@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    LibraryFrontpageComponent
  ],
  providers: [
    AuthorService,
    BookTypeService,
    BookService,
    GameSystemService,
    PublisherService
  ]
})
export class LibraryModule { }
