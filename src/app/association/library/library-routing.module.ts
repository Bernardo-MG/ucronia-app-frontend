import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@bernardo-mg/authentication';
import { LibraryFictionBookInfoContainer } from './containers/library-fiction-book-info/library-fiction-book-info.container';
import { LibraryGameBookInfoContainer } from './containers/library-game-book-info/library-game-book-info.container';
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
        data: { breadcrumb: 'Libros' }
      },
      {
        path: 'games/:index',
        component: LibraryGameBookInfoContainer,
        canActivate: [ResourceGuard("library_book", "read")],
        data: { breadcrumb: 'Juego' }
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
