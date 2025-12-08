import { Component, inject, input, output, ViewChild } from '@angular/core';
import { Member } from '@app/domain/members/member';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'assoc-member-list',
  imports: [TableModule, ButtonModule, MenuModule],
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
  public readonly active = output<boolean>();
  public readonly renewal = output<boolean>();
  public readonly changeDirection = output<{ field: string, order: number }>();
  public readonly changePage = output<number>();

  @ViewChild('editionMenu') editionMenu!: Menu;

  public editionMenuItems: MenuItem[] = [];

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

  public openEditionMenu(event: Event, member: Member) {
    this.editionMenuItems = [];

    // Determine current membership values
    const isActive = !!member.active;
    const canRenew = !!member.renew;

    // Active/Deactivate toggle
    this.editionMenuItems.push({
      label: isActive ? 'Desactivar' : 'Activar',
      command: (method) => this.onConfirmSetActive(method.originalEvent as Event, !isActive)
    });

    // Renewal toggle
    this.editionMenuItems.push({
      label: canRenew ? 'Desactivar renovación' : 'Activar renovación',
      command: (method) => this.onConfirmSetRenewal(method.originalEvent as Event, !canRenew)
    });

    // Show menu
    this.editionMenu.toggle(event);
  }

  private onConfirmSetActive(event: Event, status: boolean) {
    let message;
    if (status) {
      message = '¿Estás seguro de querer activar el socio?';
    } else {
      message = '¿Estás seguro de querer desactivar el socio?';
    }
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message,
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
      accept: () => {
        this.active.emit(status);
      }
    });
  }

  public onConfirmSetRenewal(event: Event, status: boolean) {
    let message;
    if (status) {
      message = '¿Estás seguro de querer activar la renovación del socio?';
    } else {
      message = '¿Estás seguro de querer desactivar la renovación del socio?';
    }
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message,
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
      accept: () => {
        this.renewal.emit(status);
      }
    });
  }

}