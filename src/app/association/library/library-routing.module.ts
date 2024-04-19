import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { LibraryBookInfoWidgetComponent } from './components/library-book-info-widget/library-book-info-widget.component';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';


const routes: Routes = [
  { path: '', component: LibraryFrontpageComponent },
  { path: 'book/:index', component: LibraryBookInfoWidgetComponent, canActivate: [ResourceGuard("library_book", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
