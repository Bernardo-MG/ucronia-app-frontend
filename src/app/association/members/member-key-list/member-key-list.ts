import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'assoc-member-key-list',
  imports: [FormsModule, ButtonModule, CardModule, IconFieldModule, InputIconModule, InputTextModule, MessageModule, SelectModule, TableModule, TagModule],
  templateUrl: './member-key-list.html'
})
export class MemberKeyList implements OnChanges {

  public readonly data = input<KeyAssignment[]>([]);
  public readonly loading = input(false);
  public readonly error = input(false);

  public readonly show = output<KeyAssignment>();
  public readonly retry = output<void>();

  public query = '';
  public assignment: 'all' | 'assigned' | 'unassigned' = 'all';
  public first = 0;
  public readonly filters = [
    { label: 'Todas las llaves', value: 'all' },
    { label: 'Asignadas', value: 'assigned' },
    { label: 'Sin asignar', value: 'unassigned' }
  ];

  public get assigned(): number {
    return this.data().filter(key => key.member != null).length;
  }

  public get unassigned(): number {
    return this.data().length - this.assigned;
  }

  public get filtered(): KeyAssignment[] {
    const query = this.query.trim().toLocaleLowerCase('es').replace(/#/g, '');
    return this.data().filter(key => {
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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.first = 0;
    }
  }

  public onFilter(): void {
    this.first = 0;
  }

}
