import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/containers/login/login.component';
import { LoggedInGuard } from './core/authentication/guards/logged-in.guard';
import { LoggedOutGuard } from './core/authentication/guards/logged-out.guard';
import { BlankFrameLayoutComponent } from './core/layout/components/layout-blank-frame/layout-blank-frame.component';
import { AccountLayoutComponent } from './core/layout/containers/layout-account/layout-account.component';
import { MainFrameLayoutComponent } from './core/layout/containers/layout-main-frame/layout-main-frame.component';

const frontpageModule = () => import('@app/frontpage/frontpage.module').then(m => m.FrontpageModule);
const associationModule = () => import('@app/association/association.module').then(m => m.AssociationModule);
const accountModule = () => import('@app/account/account.module').then(m => m.AccountModule);
const accessModule = () => import('@app/access/access.module').then(m => m.AccessModule);

const routes: Routes = [
  // Login
  {
    path: '', component: BlankFrameLayoutComponent, canActivate: [LoggedOutGuard],
    children: [
      { path: 'login', component: LoginComponent }
    ]
  },
  // Main app
  {
    path: '', component: MainFrameLayoutComponent,
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
