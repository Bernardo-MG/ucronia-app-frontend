
import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Transaction } from '@app/domain/transactions/transaction';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'assoc-transaction-info',
  imports: [RouterModule, SkeletonModule, PanelModule, TableModule, ButtonModule, MenuModule, ToastModule, DatePipe],
  templateUrl: './transaction-info.html'
})
export class LibraryBookInfo {

  public readonly transaction = input(new Transaction());

}
