import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { LibraryFictionBookInfoContainer } from './containers/library-fiction-book-info/library-fiction-book-info.container';
import { LibraryGameListingContainer } from './containers/library-game-listing/library-game-listing.container';
import { LibraryFictionListingContainer } from './containers/library-fiction-listing/library-fiction-listing.container';
import { LibraryGameBookInfoContainer } from './containers/library-game-book-info/library-game-book-info.container';


const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Biblioteca' },
    children: [
          {
            path: 'game',
            component: LibraryGameListingContainer,
            canActivate: [ResourceGuard("library", "view")],
            data: { breadcrumb: 'Juegos' }
          },
          {
            path: 'game/:index',
            component: LibraryGameBookInfoContainer,
            canActivate: [ResourceGuard("library_book", "read")],
            data: { breadcrumb: 'Juego' }
          },
          {
            path: 'fiction',
            component: LibraryFictionListingContainer,
            canActivate: [ResourceGuard("library", "view")],
            data: { breadcrumb: 'Ficción' }
          },
          {
            path: 'fiction/:index',
            component: LibraryFictionBookInfoContainer,
            canActivate: [ResourceGuard("library_book", "read")],
            data: { breadcrumb: 'Ficción' }
          }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
