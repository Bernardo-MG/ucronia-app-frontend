import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const memberModule = () => import('@app/members/members.module').then(m => m.MembersModule);

const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'members', loadChildren: memberModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
