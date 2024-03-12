import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryBookCreateComponent } from './components/library-book-create/library-book-create.component';
import { LibraryBookDetailsComponent } from './components/library-book-details/library-book-details.component';
import { LibraryBookTypeCreateComponent } from './components/library-book-type-create/library-book-type-create.component';
import { LibraryBookTypeDetailsComponent } from './components/library-book-type-details/library-book-type-details.component';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';
import { LibraryGameSystemCreateComponent } from './components/library-game-system-create/library-game-system-create.component';
import { LibraryGameSystemDetailsComponent } from './components/library-game-system-details/library-game-system-details.component';


const routes: Routes = [
  { path: '', component: LibraryFrontpageComponent },
  { path: 'book/add', component: LibraryBookCreateComponent },
  { path: 'bookType/add', component: LibraryBookTypeCreateComponent },
  { path: 'gameSystem/add', component: LibraryGameSystemCreateComponent },
  { path: 'book/:isbn', component: LibraryBookDetailsComponent },
  { path: 'bookType/:name', component: LibraryBookTypeDetailsComponent },
  { path: 'gameSystem/:name', component: LibraryGameSystemDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
