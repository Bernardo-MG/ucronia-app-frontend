import { NgModule } from '@angular/core';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ViewsModule } from './views/views.module';



@NgModule({
  imports: [
    PaginationModule,
    ViewsModule
  ],
  exports: [
    ViewsModule,
    AuthenticationModule
  ]
})
export class CoreModule { }
