import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryBookInfoContainer } from './containers/library-book-info/library-book-info.container';
import { LibraryListingContainer } from './containers/library-listing/library-listing.container';


const routes: Routes = [
  { path: '', component: LibraryListingContainer },
  { path: ':index', component: LibraryBookInfoContainer, canActivate: [ResourceGuard("library_book", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
