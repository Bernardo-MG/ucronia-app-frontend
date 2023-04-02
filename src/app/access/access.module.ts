import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterModule } from './register/register.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersModule,
    RolesModule,
    RegisterModule
  ]
})
export class AccessModule { }
