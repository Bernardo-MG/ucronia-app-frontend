import { inject, Injectable } from '@angular/core';
import { PaginatedResponse, Sorting, SortingProperty } from '@bernardo-mg/request';
import { Profile } from '@bernardo-mg/security';
import { BookCreation, BookUpdate, GameBookUpdate, mergeProperties, UcroniaClient } from '@ucronia/api';
import { Author, BookInfo, BookLending, BookLent, BookReturned, BookType, FictionBook, GameBook, GameSystem, Member, MemberStatus, Publisher } from '@ucronia/domain';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LibraryService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public createGameBook(data: BookCreation): Observable<BookInfo> {
    return this.ucroniaClient.library.gameBook.create(data);
  }

  public updateGameBook(number: number, data: GameBookUpdate): Observable<GameBook> {
    return this.ucroniaClient.library.gameBook.update(number, data);
  }

  public getOneGameBook(number: number): Observable<GameBook> {
    return this.ucroniaClient.library.gameBook.get(number);
  }

  public deleteGameBook(number: number): Observable<GameBook> {
    return this.ucroniaClient.library.gameBook.delete(number);
  }

  public getAllGameBooks(page: number | undefined = undefined, sort: Sorting): Observable<PaginatedResponse<GameBook>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('title'),
          new SortingProperty('supertitle'),
          new SortingProperty('subtitle'),
          new SortingProperty('number')
        ]
      )
    );

    return this.ucroniaClient.library.gameBook.page(page, undefined, sorting);
  }

  public createFictionBook(data: BookInfo): Observable<FictionBook> {
    return this.ucroniaClient.library.fictionBook.create(data);
  }

  public updateFictionBook(number: number, data: BookUpdate): Observable<FictionBook> {
    return this.ucroniaClient.library.fictionBook.update(number, data);
  }

  public getOneFictionBook(number: number): Observable<FictionBook> {
    return this.ucroniaClient.library.fictionBook.get(number);
  }

  public deleteFictionBook(number: number): Observable<FictionBook> {
    return this.ucroniaClient.library.fictionBook.delete(number);
  }

  public getAllFictionBooks(page: number | undefined = undefined, sort: Sorting): Observable<PaginatedResponse<FictionBook>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('title'),
          new SortingProperty('supertitle'),
          new SortingProperty('subtitle'),
          new SortingProperty('number')
        ]
      )
    );

    return this.ucroniaClient.library.fictionBook.page(page, undefined, sorting);
  }

  public getBookTypes(page: number | undefined = undefined): Observable<PaginatedResponse<BookType>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.bookType.page(page, undefined, sorting);
  }

  public getGameSystems(page: number | undefined = undefined): Observable<PaginatedResponse<GameSystem>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.gameSystem.page(page, undefined, sorting);
  }

  public getAuthors(page: number | undefined = undefined): Observable<PaginatedResponse<Author>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.author.page(page, undefined, sorting);
  }

  public getPublishers(page: number | undefined = undefined): Observable<PaginatedResponse<Publisher>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.publisher.page(page, undefined, sorting);
  }

  public getDonors(page: number | undefined = undefined): Observable<PaginatedResponse<Profile>> {
    const sorting = new Sorting(
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );

    return this.ucroniaClient.profile.page(page, undefined, sorting, undefined);
  }

  public lend(data: BookLent): Observable<BookLending> {
    return this.ucroniaClient.library.lending.lend(data);
  }

  public return(data: BookReturned): Observable<BookLending> {
    return this.ucroniaClient.library.lending.return(data);
  }

  public getMembers(page: number | undefined = undefined, active: MemberStatus): Observable<PaginatedResponse<Member>> {
    const sorting = new Sorting(
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );

    return this.ucroniaClient.memberProfile.page(page, undefined, sorting, active, undefined);
  }

}
