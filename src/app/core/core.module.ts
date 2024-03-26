import { NgModule } from '@angular/core';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from './authentication/authentication.module';



@NgModule({
  imports: [
    PaginationModule,
    AuthenticationModule
  ],
  exports: [
    PaginationModule,
    AuthenticationModule
  ]
})
export class CoreModule { }
