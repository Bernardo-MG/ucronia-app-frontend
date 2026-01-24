import { Injectable, inject } from '@angular/core';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Author, BookType, GameSystem, Member, MemberStatus, Profile, Publisher } from "@ucronia/domain";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class BookRelationshipSelectionService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public getBookTypes(page: number): Observable<PaginatedResponse<BookType>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.bookType.page(page, undefined, sorting);
  }

  public getGameSystems(page: number): Observable<PaginatedResponse<GameSystem>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.gameSystem.page(page, undefined, sorting);
  }

  public getAuthors(page: number): Observable<PaginatedResponse<Author>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.author.page(page, undefined, sorting);
  }

  public getPublishers(page: number): Observable<PaginatedResponse<Publisher>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.publisher.page(page, undefined, sorting);
  }

  public getDonors(page: number): Observable<PaginatedResponse<Profile>> {
    const sorting = new Sorting(
      [
        new SortingProperty('firstName'),
        new SortingProperty('lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.profile.page(page, undefined, sorting, undefined);
  }

  public getMembers(page: number, active: MemberStatus): Observable<PaginatedResponse<Member>> {
    const sorting = new Sorting(
      [
        new SortingProperty('firstName'),
        new SortingProperty('lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.memberProfile.page(page, undefined, sorting, active, undefined);
  }

}
