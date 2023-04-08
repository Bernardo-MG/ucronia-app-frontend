import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/containers/login/login.component';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { AccountFrameComponent } from './core/layout/containers/account-frame/account-frame.component';
import { HeaderFrameComponent } from './core/layout/containers/header-frame/header-frame.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const accessModule = () => import('@app/access/access.module').then(m => m.AccessModule);

const routes: Routes = [
  // Login
  {
    path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard]
  },
  // Main app
  {
    path: '', component: HeaderFrameComponent,
    children: [
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
    path: 'account', component: AccountFrameComponent, children: [
      { path: '', loadChildren: accountModule, canActivate: [LoggedInGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
