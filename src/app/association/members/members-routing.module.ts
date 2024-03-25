import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFrontpageComponent } from './components/member-frontpage/member-frontpage.component';


const routes: Routes = [
  { path: '', component: MemberFrontpageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }