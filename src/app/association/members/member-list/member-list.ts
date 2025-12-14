import { Component, inject, input, output } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { MemberStatusTag } from '@app/shared/contact/member-status-tag/member-status-tag';
import { ConfirmationService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'assoc-member-list',
  imports: [TableModule, ButtonModule, BadgeModule, MemberStatusTag],
  templateUrl: './member-list.html'
})
export class MemberList {

  private readonly confirmationService = inject(ConfirmationService);

  public readonly loading = input(false);
  public readonly readContact = input(false);
  public readonly editable = input(false);
  public readonly deletable = input(false);
  public readonly members = input<Member[]>([]);
  public readonly rows = input(0);
  public readonly page = input(0);
  public readonly totalRecords = input(0);

  public readonly show = output<Member>();
  public readonly delete = output<number>();
  public readonly edit = output<Member>();
  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  public get first() {
    return (this.page() - 1) * this.rows();
  }

  public onDelete(event: Event, number: number) {
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
      accept: () => this.delete.emit(number)
    });
  }

}