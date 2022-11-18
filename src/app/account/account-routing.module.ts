import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountChangePasswordViewComponent } from './views/account-change-password-view/account-change-password-view.component';
import { AccountSettingsViewComponent } from './views/account-settings-view/account-settings-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'settings', component: AccountSettingsViewComponent },
            { path: 'changePassword', component: AccountChangePasswordViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }