import { NgModule } from '@angular/core';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { LayoutModule } from './layout/layout.module';



@NgModule({
  imports: [
    LayoutModule,
    PaginationModule,
    AuthenticationModule
  ],
  exports: [
    LayoutModule,
    PaginationModule,
    AuthenticationModule
  ]
})
export class CoreModule { }
