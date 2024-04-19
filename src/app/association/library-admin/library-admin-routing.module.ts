import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryAdminAuthorCreateComponent } from './components/library-admin-author-create/library-admin-author-create.component';
import { LibraryAdminAuthorInfoEditorComponent } from './components/library-admin-author-info-editor/library-admin-author-info-editor.component';
import { LibraryAdminBookCreateComponent } from './components/library-admin-book-create/library-admin-book-create.component';
import { LibraryAdminBookInfoEditorComponent } from './components/library-admin-book-info-editor/library-admin-book-info-editor.component';
import { LibraryAdminBookTypeCreateComponent } from './components/library-admin-book-type-create/library-admin-book-type-create.component';
import { LibraryAdminBookTypeInfoEditorComponent } from './components/library-admin-book-type-info-editor/library-admin-book-type-info-editor.component';
import { LibraryAdminFrontpageComponent } from './components/library-admin-frontpage/library-admin-frontpage.component';
import { LibraryAdminGameSystemCreateComponent } from './components/library-admin-game-system-create/library-admin-game-system-create.component';
import { LibraryAdminGameSystemInfoEditorComponent } from './components/library-admin-game-system-info-editor/library-admin-game-system-info-editor.component';
import { LibraryAdminPublisherCreateComponent } from './components/library-admin-publisher-create/library-admin-publisher-create.component';
import { LibraryAdminPublisherInfoEditorComponent } from './components/library-admin-publisher-info-editor/library-admin-publisher-info-editor.component';


const routes: Routes = [
  { path: '', component: LibraryAdminFrontpageComponent },
  { path: 'author/add', component: LibraryAdminAuthorCreateComponent, canActivate: [ResourceGuard("library_author", "create")] },
  { path: 'book/add', component: LibraryAdminBookCreateComponent, canActivate: [ResourceGuard("library_book", "create")] },
  { path: 'bookType/add', component: LibraryAdminBookTypeCreateComponent, canActivate: [ResourceGuard("library_book_type", "create")] },
  { path: 'gameSystem/add', component: LibraryAdminGameSystemCreateComponent, canActivate: [ResourceGuard("library_game_system", "create")] },
  { path: 'publisher/add', component: LibraryAdminPublisherCreateComponent, canActivate: [ResourceGuard("library_publisher", "create")] },
  { path: 'author/:name', component: LibraryAdminAuthorInfoEditorComponent, canActivate: [ResourceGuard("library_author", "read")] },
  { path: 'book/:index', component: LibraryAdminBookInfoEditorComponent, canActivate: [ResourceGuard("library_book", "read")] },
  { path: 'bookType/:name', component: LibraryAdminBookTypeInfoEditorComponent, canActivate: [ResourceGuard("library_book_type", "read")] },
  { path: 'gameSystem/:name', component: LibraryAdminGameSystemInfoEditorComponent, canActivate: [ResourceGuard("library_game_system", "read")] },
  { path: 'publisher/:name', component: LibraryAdminPublisherInfoEditorComponent, canActivate: [ResourceGuard("library_publisher", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryAdminRoutingModule { }
