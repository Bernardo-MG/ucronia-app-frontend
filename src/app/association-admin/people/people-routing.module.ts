import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { PeopleFrontpageComponent } from '../people/components/people-frontpage/people-frontpage.component';
import { PeopleCreateComponent } from './components/people-create/people-create.component';
import { PeopleInfoEditorComponent } from './components/people-info-editor/people-info-editor.component';


const routes: Routes = [
  { path: '', component: PeopleFrontpageComponent, canActivate: [ResourceGuard("person", "read")] },
  { path: 'register', component: PeopleCreateComponent, canActivate: [ResourceGuard("person", "create")] },
  { path: ':number', component: PeopleInfoEditorComponent, canActivate: [ResourceGuard("person", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }