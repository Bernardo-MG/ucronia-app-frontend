import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListViewComponent } from './views/member-list-view/member-list-view.component';
import { MemberInfoViewComponent } from './views/member-info-view/member-info-view.component';



@NgModule({
  declarations: [
    MemberListViewComponent,
    MemberInfoViewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MembersModule { }
