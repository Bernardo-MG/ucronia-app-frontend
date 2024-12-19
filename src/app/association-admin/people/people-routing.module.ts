import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourceGuard } from '@app/core/authentication/guards/resource.guard';
import { PeopleCreationContainer } from './containers/people-creation/people-creation.container';
import { PeopleListingContainer } from './containers/people-listing/people-listing.container';
import { PeopleInfoEditionContainer } from './containers/people-edition/people-edition.container';


const routes: Routes = [
  { path: '', component: PeopleListingContainer, canActivate: [ResourceGuard("person", "read")] },
  { path: 'register', component: PeopleCreationContainer, canActivate: [ResourceGuard("person", "create")] },
  { path: ':number', component: PeopleInfoEditionContainer, canActivate: [ResourceGuard("person", "read")] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }