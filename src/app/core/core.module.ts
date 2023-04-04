import { NgModule } from '@angular/core';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { LayoutModule } from './layout/layout.module';



@NgModule({
  imports: [
    PaginationModule,
    LayoutModule
  ],
  exports: [
    LayoutModule,
    AuthenticationModule
  ]
})
export class CoreModule { }
