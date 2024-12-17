import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryAdminBookCreationContainer } from './book/containers/library-admin-book-creation/library-admin-book-creation.container';
import { LibraryAdminBookInfoEditorContainer } from './book/containers/library-admin-book-edition/library-admin-book-edition.container';
import { LibraryAdminAuthorCreateComponent } from './components/author/library-admin-author-create/library-admin-author-create.component';
import { LibraryAdminAuthorInfoEditorComponent } from './components/author/library-admin-author-info-editor/library-admin-author-info-editor.component';
import { LibraryAdminBookTypeCreateComponent } from './components/book-type/library-admin-book-type-create/library-admin-book-type-create.component';
import { LibraryAdminBookTypeInfoEditorComponent } from './components/book-type/library-admin-book-type-info-editor/library-admin-book-type-info-editor.component';
import { LibraryAdminGameSystemCreateComponent } from './components/game-system/library-admin-game-system-create/library-admin-game-system-create.component';
import { LibraryAdminGameSystemInfoEditorComponent } from './components/game-system/library-admin-game-system-info-editor/library-admin-game-system-info-editor.component';
import { LibraryAdminFrontpageComponent } from './components/library-admin-frontpage/library-admin-frontpage.component';
import { LibraryAdminPublisherCreateComponent } from './components/publisher/library-admin-publisher-create/library-admin-publisher-create.component';
import { LibraryAdminPublisherInfoEditorComponent } from './components/publisher/library-admin-publisher-info-editor/library-admin-publisher-info-editor.component';
import { BookLendingLendComponent } from './lending/containers/book-lending-lending/book-lending-lending.component';
import { BookLendingReturnComponent } from './lending/containers/book-lending-returning/book-lending-returning.component';


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
