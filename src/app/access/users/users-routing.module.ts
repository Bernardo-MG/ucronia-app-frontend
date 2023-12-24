import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessUserCreateComponent } from './components/access-user-create/access-user-create.component';
import { AccessUserDetailsComponent } from './components/access-user-details/access-user-details.component';
import { AccessFrontpageComponent } from './components/access-user-frontpage/access-user-frontpage.component';


const routes: Routes = [
  { path: '', component: AccessFrontpageComponent },
  { path: 'add', component: AccessUserCreateComponent },
  { path: ':user', component: AccessUserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }