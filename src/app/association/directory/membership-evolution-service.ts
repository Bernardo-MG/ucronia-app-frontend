import { Injectable, inject } from '@angular/core';
import { MembershipEvolutionMonth } from "@ucronia/domain";
import { UcroniaClient } from 'projects/ucronia/api/src/lib/api/ucronia-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class MembershipEvolutionService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public monthly(from: Date | undefined, to: Date | undefined): Observable<MembershipEvolutionMonth[]> {
    return this.ucroniaClient.member.evolution(from, to);
  }

}
