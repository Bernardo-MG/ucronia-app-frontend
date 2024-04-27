import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFeeFrontpageComponent } from './components/views/user-fee-frontpage/user-fee-frontpage.component';


const routes: Routes = [
  { path: '', component: UserFeeFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFeesRoutingModule { }