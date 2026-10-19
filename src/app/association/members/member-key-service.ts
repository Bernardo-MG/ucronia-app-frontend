import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { KeyAssignment } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemberKeyService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getAll(): Observable<KeyAssignment[]> {
    const sorting = new Sorting([new SortingProperty('number')]);
    return getAllPages((page, size) => this.ucroniaClient.key.assignments(page, size, sorting));
  }

}
