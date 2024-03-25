import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryAuthorCreateComponent } from './components/library-author-create/library-author-create.component';
import { LibraryAuthorInfoEditorComponent } from './components/library-author-info-editor/library-author-info-editor.component';
import { LibraryBookCreateComponent } from './components/library-book-create/library-book-create.component';
import { LibraryBookInfoEditorComponent } from './components/library-book-info-editor/library-book-info-editor.component';
import { LibraryBookTypeCreateComponent } from './components/library-book-type-create/library-book-type-create.component';
import { LibraryBookTypeInfoEditorComponent } from './components/library-book-type-info-editor/library-book-type-info-editor.component';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';
import { LibraryGameSystemCreateComponent } from './components/library-game-system-create/library-game-system-create.component';
import { LibraryGameSystemInfoEditorComponent } from './components/library-game-system-info-editor/library-game-system-info-editor.component';
import { LibraryPublisherCreateComponent } from './components/library-publisher-create/library-publisher-create.component';
import { LibraryPublisherInfoEditorComponent } from './components/library-publisher-info-editor/library-publisher-info-editor.component';


const routes: Routes = [
  { path: '', component: LibraryFrontpageComponent },
  { path: 'author/add', component: LibraryAuthorCreateComponent },
  { path: 'book/add', component: LibraryBookCreateComponent },
  { path: 'bookType/add', component: LibraryBookTypeCreateComponent },
  { path: 'gameSystem/add', component: LibraryGameSystemCreateComponent },
  { path: 'publisher/add', component: LibraryPublisherCreateComponent },
  { path: 'author/:name', component: LibraryAuthorInfoEditorComponent },
  { path: 'book/:index', component: LibraryBookInfoEditorComponent },
  { path: 'bookType/:name', component: LibraryBookTypeInfoEditorComponent },
  { path: 'gameSystem/:name', component: LibraryGameSystemInfoEditorComponent },
  { path: 'publisher/:name', component: LibraryPublisherInfoEditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
