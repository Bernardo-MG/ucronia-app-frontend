import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { KeyAssignment } from '@ucronia/domain';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { finalize } from 'rxjs';
import { MemberKeyService } from '../member-key-service';

@Component({
  selector: 'assoc-member-key-list',
  imports: [FormsModule, ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, MessageModule, SelectModule, TableModule, TagModule],
  templateUrl: './member-key-list.html'
})
export class MemberKeyList implements OnInit {

  private readonly service = inject(MemberKeyService);

  private readonly destroyRef = inject(DestroyRef);

  public readonly canRead = inject(AuthService).hasPermission(UcroniaPermissions.key.read);

  public data: KeyAssignment[] = [];
  public loading = false;
  public error = false;
  public query = '';
  public assignment: 'all' | 'assigned' | 'unassigned' = 'all';
  public first = 0;
  public readonly filters = [
    { label: 'Todas las llaves', value: 'all' },
    { label: 'Asignadas', value: 'assigned' },
    { label: 'Sin asignar', value: 'unassigned' }
  ];

  public get assigned(): number {
    return this.data.filter(key => key.member != null).length;
  }

  public get unassigned(): number {
    return this.data.length - this.assigned;
  }

  public get filtered(): KeyAssignment[] {
    const query = this.query.trim().toLocaleLowerCase('es').replace(/#/g, '');
    return this.data.filter(key => {
      const assigned = key.member != null;
      if (this.assignment === 'assigned' && !assigned) {
        return false;
      }
      if (this.assignment === 'unassigned' && assigned) {
        return false;
      }
      return `${key.number} ${key.description} ${key.member?.name ?? ''} ${key.member?.memberNumber ?? ''}`
        .toLocaleLowerCase('es')
        .includes(query);
    });
  }

  public ngOnInit(): void {
    this.load();
  }

  public onFilter(): void {
    this.first = 0;
  }

  public load(): void {
    if (!this.canRead || this.loading) {
      return;
    }
    this.loading = true;
    this.error = false;
    this.service
      .getAll()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: data => {
          this.data = data;
          this.first = 0;
        },
        error: () => {
          this.error = true;
          this.data = [];
        }
      });
  }

}
