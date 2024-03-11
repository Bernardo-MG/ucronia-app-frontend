import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryBookCreateComponent } from './components/library-book-create/library-book-create.component';
import { LibraryBookDetailsComponent } from './components/library-book-details/library-book-details.component';
import { LibraryBookTypeCreateComponent } from './components/library-book-type-create/library-book-type-create.component';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';
import { LibraryGameSystemCreateComponent } from './components/library-game-system-create/library-game-system-create.component';


const routes: Routes = [
  { path: '', component: LibraryFrontpageComponent },
  { path: 'books/add', component: LibraryBookCreateComponent },
  { path: 'bookTypes/add', component: LibraryBookTypeCreateComponent },
  { path: 'gameSystems/add', component: LibraryGameSystemCreateComponent },
  { path: 'books/:isbn', component: LibraryBookDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
