import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryLendingFrontpageComponent } from './components/views/library-lending-frontpage/library-lending-frontpage.component';


const routes: Routes = [
  { path: '', component: LibraryLendingFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryLendingRoutingModule { }
