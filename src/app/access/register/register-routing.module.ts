import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityRegisterViewComponent } from './containers/security-register-view/security-register-view.component';


const routes: Routes = [
    { path: 'register', component: SecurityRegisterViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }