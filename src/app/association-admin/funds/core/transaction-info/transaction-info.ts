
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transaction } from '@app/domain/transactions/transaction';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'assoc-transaction-info',
  imports: [CardModule, RouterModule, SkeletonModule, PanelModule, TableModule, ButtonModule, MenuModule, ConfirmPopupModule, ToastModule],
  templateUrl: './transaction-info.html',
  providers: [ConfirmationService, MessageService]
})
export class LibraryAdminBookInfo {

  public readonly transaction = input(new Transaction());

}
