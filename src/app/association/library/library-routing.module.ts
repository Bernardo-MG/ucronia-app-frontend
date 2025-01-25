import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryBookInfoContainer } from './containers/library-book-info/library-book-info.container';
import { LibraryListingContainer } from './containers/library-listing/library-listing.container';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Biblioteca' },
    children: [
          {
            path: '',
            component: LibraryListingContainer,
            canActivate: [ResourceGuard("library", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: ':index',
            component: LibraryBookInfoContainer,
            canActivate: [ResourceGuard("library_book", "read")],
            data: { breadcrumb: 'Libro' }
          }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
