import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { LibraryBookGameInfoContainer } from './containers/library-fiction-book-info/library-fiction-book-info.container';
import { LibraryGameListingContainer } from './containers/library-game-listing/library-game-listing.container';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Biblioteca' },
    children: [
          {
            path: '',
            component: LibraryGameListingContainer,
            canActivate: [ResourceGuard("library", "view")],
            data: { breadcrumb: '' }
          },
          {
            path: ':index',
            component: LibraryBookGameInfoContainer,
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
