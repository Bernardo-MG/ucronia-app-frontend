import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberInfoViewComponent } from './views/member-info-view/member-info-view.component';
import { MemberListViewComponent } from './views/member-list-view/member-list-view.component';


const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: MemberListViewComponent },
            { path: ':id', component: MemberInfoViewComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WeaponExploreRoutingModule { }