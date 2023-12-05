import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTokenFrontpageComponent } from './components/user-token-frontpage/user-token-frontpage.component';
import { UserTokenDetailsComponent } from './components/user-token-details/user-token-details.component';

const routes: Routes = [
  { path: '', component: UserTokenFrontpageComponent },
  { path: ':id', component: UserTokenDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTokensRoutingModule { }