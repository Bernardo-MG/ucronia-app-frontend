import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryBookCreateComponent } from './components/library-book-create/library-book-create.component';
import { LibraryBookDetailsComponent } from './components/library-book-details/library-book-details.component';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';


const routes: Routes = [
  { path: '', component: LibraryFrontpageComponent },
  { path: 'books/add', component: LibraryBookCreateComponent },
  { path: 'books/:isbn', component: LibraryBookDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
