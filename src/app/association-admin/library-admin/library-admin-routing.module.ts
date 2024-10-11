import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryAdminAuthorCreateComponent } from './components/author/library-admin-author-create/library-admin-author-create.component';
import { LibraryAdminAuthorInfoEditorComponent } from './components/author/library-admin-author-info-editor/library-admin-author-info-editor.component';
import { LibraryAdminBookTypeCreateComponent } from './components/book-type/library-admin-book-type-create/library-admin-book-type-create.component';
import { LibraryAdminBookTypeInfoEditorComponent } from './components/book-type/library-admin-book-type-info-editor/library-admin-book-type-info-editor.component';
import { LibraryAdminBookCreateComponent } from './components/book/library-admin-book-create/library-admin-book-create.component';
import { LibraryAdminBookInfoEditorComponent } from './components/book/library-admin-book-info-editor/library-admin-book-info-editor.component';
import { LibraryAdminDonorCreateComponent } from './components/donor/library-admin-donor-create/library-admin-donor-create.component';
import { LibraryAdminDonorInfoEditorComponent } from './components/donor/library-admin-donor-info-editor/library-admin-donor-info-editor.component';
import { LibraryAdminGameSystemCreateComponent } from './components/game-system/library-admin-game-system-create/library-admin-game-system-create.component';
import { LibraryAdminGameSystemInfoEditorComponent } from './components/game-system/library-admin-game-system-info-editor/library-admin-game-system-info-editor.component';
import { LibraryAdminFrontpageComponent } from './components/library-admin-frontpage/library-admin-frontpage.component';
import { LibraryAdminPublisherCreateComponent } from './components/publisher/library-admin-publisher-create/library-admin-publisher-create.component';
import { LibraryAdminPublisherInfoEditorComponent } from './components/publisher/library-admin-publisher-info-editor/library-admin-publisher-info-editor.component';


const routes: Routes = [
  { path: '', component: LibraryAdminFrontpageComponent },
  { path: 'author/add', component: LibraryAdminAuthorCreateComponent, canActivate: [ResourceGuard("library_author", "create")] },
  { path: 'book/add', component: LibraryAdminBookCreateComponent, canActivate: [ResourceGuard("library_book", "create")] },
  { path: 'bookType/add', component: LibraryAdminBookTypeCreateComponent, canActivate: [ResourceGuard("library_book_type", "create")] },
  { path: 'donor/add', component: LibraryAdminDonorCreateComponent, canActivate: [ResourceGuard("inventory_donor", "create")] },
  { path: 'gameSystem/add', component: LibraryAdminGameSystemCreateComponent, canActivate: [ResourceGuard("library_game_system", "create")] },
  { path: 'publisher/add', component: LibraryAdminPublisherCreateComponent, canActivate: [ResourceGuard("library_publisher", "create")] },
  { path: 'author/:number', component: LibraryAdminAuthorInfoEditorComponent, canActivate: [ResourceGuard("library_author", "read")] },
  { path: 'book/:number', component: LibraryAdminBookInfoEditorComponent, canActivate: [ResourceGuard("library_book", "read")] },
  { path: 'bookType/:number', component: LibraryAdminBookTypeInfoEditorComponent, canActivate: [ResourceGuard("library_book_type", "read")] },
  { path: 'gameSystem/:number', component: LibraryAdminGameSystemInfoEditorComponent, canActivate: [ResourceGuard("library_game_system", "read")] },
  { path: 'publisher/:number', component: LibraryAdminPublisherInfoEditorComponent, canActivate: [ResourceGuard("library_publisher", "read")] },
  { path: 'donor/:number', component: LibraryAdminDonorInfoEditorComponent, canActivate: [ResourceGuard("inventory_donor", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryAdminRoutingModule { }
