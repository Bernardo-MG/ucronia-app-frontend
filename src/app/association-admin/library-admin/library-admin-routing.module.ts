import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryAdminAuthorCreateComponent } from './author/containers/library-admin-author-creation/library-admin-author-creation.component';
import { LibraryAdminAuthorInfoEditorComponent } from './author/containers/library-admin-author-edition/library-admin-author-edition.component';
import { LibraryAdminBookTypeCreateComponent } from './book-type/containers/library-admin-book-type-creation/library-admin-book-type-creation.component';
import { LibraryAdminBookTypeInfoEditorComponent } from './book-type/containers/library-admin-book-type-info-editor/library-admin-book-type-info-editor.component';
import { LibraryAdminBookCreationContainer } from './book/containers/library-admin-book-creation/library-admin-book-creation.container';
import { LibraryAdminBookInfoEditorContainer } from './book/containers/library-admin-book-edition/library-admin-book-edition.container';
import { LibraryAdminGameSystemCreateComponent } from './game-system/containers/library-admin-game-system-creation/library-admin-game-system-creation.component';
import { LibraryAdminGameSystemInfoEditorComponent } from './game-system/containers/library-admin-game-system-edition/library-admin-game-system-edition.component';
import { BookLendingLendComponent } from './lending/containers/book-lending-lending/book-lending-lending.component';
import { BookLendingReturnComponent } from './lending/containers/book-lending-returning/book-lending-returning.component';
import { LibraryAdminFrontpageComponent } from './frontpage/containers/library-admin-frontpage/library-admin-frontpage.component';
import { LibraryAdminPublisherCreateComponent } from './publisher/containers/library-admin-publisher-creation/library-admin-publisher-creation.component';
import { LibraryAdminPublisherInfoEditorComponent } from './publisher/containers/library-admin-publisher-edition/library-admin-publisher-edition.component';


const routes: Routes = [
  { path: '', component: LibraryAdminFrontpageComponent },
  { path: 'author/add', component: LibraryAdminAuthorCreateComponent, canActivate: [ResourceGuard("library_author", "create")] },
  { path: 'bookType/add', component: LibraryAdminBookTypeCreateComponent, canActivate: [ResourceGuard("library_book_type", "create")] },
  { path: 'gameSystem/add', component: LibraryAdminGameSystemCreateComponent, canActivate: [ResourceGuard("library_game_system", "create")] },
  { path: 'publisher/add', component: LibraryAdminPublisherCreateComponent, canActivate: [ResourceGuard("library_publisher", "create")] },
  { path: 'author/:number', component: LibraryAdminAuthorInfoEditorComponent, canActivate: [ResourceGuard("library_author", "read")] },
  { path: 'bookType/:number', component: LibraryAdminBookTypeInfoEditorComponent, canActivate: [ResourceGuard("library_book_type", "read")] },
  { path: 'gameSystem/:number', component: LibraryAdminGameSystemInfoEditorComponent, canActivate: [ResourceGuard("library_game_system", "read")] },
  { path: 'publisher/:number', component: LibraryAdminPublisherInfoEditorComponent, canActivate: [ResourceGuard("library_publisher", "read")] },
  { path: 'book/add', component: LibraryAdminBookCreationContainer, canActivate: [ResourceGuard("library_book", "create")] },
  { path: 'book/:number', component: LibraryAdminBookInfoEditorContainer, canActivate: [ResourceGuard("library_book", "read")] },
  { path: 'book/:number/lend', component: BookLendingLendComponent, canActivate: [ResourceGuard("library_lending", "view")] },
  { path: 'book/:number/return', component: BookLendingReturnComponent, canActivate: [ResourceGuard("library_lending", "view")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryAdminRoutingModule { }
