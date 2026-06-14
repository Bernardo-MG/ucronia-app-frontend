import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { BookCreation, BookUpdate, GameBookUpdate, mergeProperties, UcroniaClient } from '@ucronia/api';
import { Author, BookLending, BookLent, BookReturned, BookType, FictionBook, GameBook, GameSystem, MemberStatus, Profile, PublicMember, Publisher } from '@ucronia/domain';
import { forkJoin, map, Observable } from 'rxjs';
import { LibrarySummary } from '../model/library-summary';

@Injectable({
  providedIn: "root"
})
export class LibraryService {

  private readonly ucroniaClient = inject(UcroniaClient);

  public createGameBook(data: BookCreation): Observable<BookCreation> {
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

  public getAllGameBooks(page: number | undefined = undefined, sort: Sorting, title: string | undefined): Observable<Page<GameBook>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('title.title'),
          new SortingProperty('title.supertitle'),
          new SortingProperty('title.subtitle'),
          new SortingProperty('number')
        ]
      )
    );

    return this.ucroniaClient.library.gameBook.page(page, undefined, sorting, title);
  }

  public createFictionBook(data: BookCreation): Observable<FictionBook> {
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

  public getAllFictionBooks(page: number | undefined = undefined, sort: Sorting, title: string | undefined): Observable<Page<FictionBook>> {
    const sorting = new Sorting(
      mergeProperties(
        sort.properties,
        [
          new SortingProperty('title.title'),
          new SortingProperty('title.supertitle'),
          new SortingProperty('title.subtitle'),
          new SortingProperty('number')
        ]
      )
    );

    return this.ucroniaClient.library.fictionBook.page(page, undefined, sorting, title);
  }

  public getBookTypes(page: number | undefined = undefined): Observable<Page<BookType>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.bookType.page(page, undefined, sorting);
  }

  public getGameSystems(page: number | undefined = undefined): Observable<Page<GameSystem>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.gameSystem.page(page, undefined, sorting);
  }

  public getAuthors(page: number | undefined = undefined): Observable<Page<Author>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.author.page(page, undefined, sorting);
  }

  public getPublishers(page: number | undefined = undefined): Observable<Page<Publisher>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.publisher.page(page, undefined, sorting);
  }

  public getDonors(page: number | undefined = undefined): Observable<Page<Profile>> {
    const sorting = new Sorting(
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.profile.page(page, undefined, sorting, undefined);
  }

  public lend(data: BookLent): Observable<BookLending> {
    return this.ucroniaClient.library.lending.lend(data);
  }

  public return(data: BookReturned): Observable<BookLending> {
    return this.ucroniaClient.library.lending.return(data);
  }

  public getMembers(page: number | undefined = undefined, active: MemberStatus): Observable<Page<PublicMember>> {
    const sorting = new Sorting(
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.memberProfile.page(page, undefined, sorting, active, undefined);
  }

  public getSummary(): Observable<LibrarySummary> {
    return forkJoin({
      games: this.ucroniaClient.library.gameBook.page(undefined, 0),
      fiction: this.ucroniaClient.library.fictionBook.page(undefined, 0),
      lent: this.ucroniaClient.library.lending.page(undefined, 0)
    })
      .pipe(
        map((r) => {
          return {
            games: r.games.totalElements,
            fiction: r.fiction.totalElements,
            lent: r.lent.totalElements
          }
        })
      )
  }

}
