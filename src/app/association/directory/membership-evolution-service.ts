import { Injectable, inject } from '@angular/core';
import { UcroniaClient } from '@ucronia/api';
import { MembershipEvolutionMonth } from "@ucronia/domain";
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
