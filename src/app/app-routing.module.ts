import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const adminModule = () => import('@app/admin/admin.module').then(m => m.AdminModule);
const memberModule = () => import('@app/members/members.module').then(m => m.MembersModule);

const routes: Routes = [
  { path: '', loadChildren: frontpageModule },
  { path: 'admin', loadChildren: adminModule },
  { path: 'members', loadChildren: memberModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
