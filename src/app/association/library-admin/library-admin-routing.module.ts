import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: 'author/add', component: LibraryAdminAuthorCreateComponent },
  { path: 'book/add', component: LibraryAdminBookCreateComponent },
  { path: 'bookType/add', component: LibraryAdminBookTypeCreateComponent },
  { path: 'gameSystem/add', component: LibraryAdminGameSystemCreateComponent },
  { path: 'publisher/add', component: LibraryAdminPublisherCreateComponent },
  { path: 'author/:name', component: LibraryAdminAuthorInfoEditorComponent },
  { path: 'book/:index', component: LibraryAdminBookInfoEditorComponent },
  { path: 'bookType/:name', component: LibraryAdminBookTypeInfoEditorComponent },
  { path: 'gameSystem/:name', component: LibraryAdminGameSystemInfoEditorComponent },
  { path: 'publisher/:name', component: LibraryAdminPublisherInfoEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryAdminRoutingModule { }
