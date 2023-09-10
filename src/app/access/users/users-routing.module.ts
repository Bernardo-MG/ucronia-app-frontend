import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessUserCreateComponent } from './components/access-user-create/access-user-create.component';
import { AccessUserDetailsComponent } from './components/access-user-details/access-user-details.component';
import { AccessUserListComponent } from './components/access-user-list/access-user-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AccessUserListComponent },
      { path: 'create', component: AccessUserCreateComponent },
      { path: ':id', component: AccessUserDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }