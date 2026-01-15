import { Component, inject, input, output } from '@angular/core';
import { SortingEvent } from '@app/shared/request/sorting-event';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ProfileInfo } from '../model/profile-info';

@Component({
  selector: 'assoc-sponsor-list',
  imports: [ButtonModule, TableModule],
  templateUrl: './sponsor-list.html'
})
export class SponsorList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly profiles = input<ProfileInfo[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<ProfileInfo>();
  public readonly edit = output<ProfileInfo>();
  public readonly delete = output<number>();
  public readonly changeDirection = output<SortingEvent>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onPageChange(event: TablePageEvent) {
    const page = (event.first / event.rows) + 1;
    this.changePage.emit(page);
  }

  public confirmDelete(event: Event, profile: ProfileInfo) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Borrar',
        severity: 'danger'
      },
      accept: () => this.delete.emit(profile.number)
    });
  }

}
