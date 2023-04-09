import { NgModule } from '@angular/core';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ViewModule } from './view/view.module';



@NgModule({
  imports: [
    PaginationModule,
    ViewModule
  ],
  exports: [
    ViewModule,
    AuthenticationModule
  ]
})
export class CoreModule { }
