import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryFrontpageComponent } from './components/library-frontpage/library-frontpage.component';


const routes: Routes = [
  { path: '', component: LibraryFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
