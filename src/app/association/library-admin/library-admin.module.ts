import { NgModule } from '@angular/core';
import { AuthorAdminService } from './services/author-admin.service';
import { BookTypeAdminService } from './services/book-type-admin.service';
import { BookAdminService } from './services/book-admin.service';
import { GameSystemAdminService } from './services/game-system-admin.service';
import { PublisherAdminService } from './services/publisher-admin.service';
import { LibraryAdminRoutingModule } from './library-admin-routing.module';



@NgModule({
  imports: [
    LibraryAdminRoutingModule
  ],
  providers: [
    AuthorAdminService,
    BookTypeAdminService,
    BookAdminService,
    GameSystemAdminService,
    PublisherAdminService
  ]
})
export class LibraryAdminModule { }
