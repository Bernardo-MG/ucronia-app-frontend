import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTokenFrontpageComponent } from './components/user-token-frontpage/user-token-frontpage.component';

const routes: Routes = [
  { path: '', component: UserTokenFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTokensRoutingModule { }