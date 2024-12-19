import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryBookInfoContainer } from './book/containers/library-book-info/library-book-info.container';
import { LibraryListContainer } from './book/containers/library-list/library-list.container';


const routes: Routes = [
  { path: '', component: LibraryListContainer },
  { path: ':index', component: LibraryBookInfoContainer, canActivate: [ResourceGuard("library_book", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
