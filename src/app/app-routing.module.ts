import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountLayoutComponent } from './account/layout/account-layout/account-layout.component';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { AssociationLayoutComponent } from './core/layout/containers/association-layout/association-layout.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);

const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);

const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);

const accessModule = () => import('@app/access/access.module').then(m => m.AccessModule);

const routes: Routes = [
  // Main app
  {
    path: '', component: AssociationLayoutComponent, children: [
      // Front page
      { path: '', loadChildren: frontpageModule, canActivate: [LoggedInGuard] },
      // Admin
      { path: '', loadChildren: associationModule, canActivate: [LoggedInGuard] },
      // Security
      { path: 'security', loadChildren: accessModule, canActivate: [LoggedInGuard] }
    ]
  },
  // Account
  {
    path: 'account', component: AccountLayoutComponent, children: [
      { path: '', loadChildren: accountModule, canActivate: [LoggedInGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
