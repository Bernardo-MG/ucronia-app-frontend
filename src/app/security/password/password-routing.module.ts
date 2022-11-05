import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityChangePasswordViewComponent } from './views/security-change-password-view/security-change-password-view.component';


const routes: Routes = [
    { path: 'password', component: SecurityChangePasswordViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PasswordRoutingModule { }