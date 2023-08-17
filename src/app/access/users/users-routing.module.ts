import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaddedFrameComponent } from '@app/core/layout/components/padded-frame/padded-frame.component';
import { AccessUserCreateComponent } from './components/access-user-create/access-user-create.component';
import { AccessUserDetailsComponent } from './components/access-user-details/access-user-details.component';
import { AccessUserListComponent } from './components/access-user-list/access-user-list.component';


const routes: Routes = [
  {
    path: '',
    component: PaddedFrameComponent,
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