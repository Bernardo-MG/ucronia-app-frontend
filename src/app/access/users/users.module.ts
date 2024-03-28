import { NgModule } from '@angular/core';
import { AccessUserService } from './services/access-user.service';
import { UserRoutingModule } from './users-routing.module';



@NgModule({
  imports: [
    UserRoutingModule
  ],
  providers: [
    AccessUserService
  ]
})
export class UsersModule { }
