import { inject, Injectable } from '@angular/core';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { BookCreation, BookUpdate, GameBookUpdate, mergeProperties, UcroniaClient } from '@ucronia/api';
import { Author, BookLending, BookLent, BookReturned, BookType, Donor, FictionBook, GameBook, GameSystem, MemberStatus, Profile, PublicMember, Publisher } from '@ucronia/domain';
import { catchError, forkJoin, map, Observable, tap, throwError } from 'rxjs';
import { LibrarySummary } from '../model/library-summary';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: "root"
})
export class LibraryService {

  private readonly ucroniaClient = inject(UcroniaClient);
  private readonly messageService = inject(MessageService);

  public createGameBook(data: BookCreation): Observable<BookCreation> {
    return this.ucroniaClient.library.gameBook.create(data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Creado',
            detail: 'Datos creados',
            life: 3000
          });
        })
      );
  }

  public updateGameBook(number: number, data: GameBookUpdate): Observable<GameBook> {
    return this.ucroniaClient.library.gameBook.update(number, data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Datos actualizados',
            life: 3000
          });
        })
      );
  }

  public getOneGameBook(number: number): Observable<GameBook> {
    return this.ucroniaClient.library.gameBook.get(number);
  }

  public deleteGameBook(number: number): Observable<GameBook> {
    return this.ucroniaClient.library.gameBook.delete(number)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Borrado',
            detail: 'Datos borrados',
            life: 3000
          });
        }),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo borrar el registro',
            life: 5000
          });
          return throwError(() => error);
        })
      );
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
    return this.ucroniaClient.library.fictionBook.create(data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Creado',
            detail: 'Datos creados',
            life: 3000
          });
        })
      );
  }

  public updateFictionBook(number: number, data: BookUpdate): Observable<FictionBook> {
    return this.ucroniaClient.library.fictionBook.update(number, data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Actualizado',
            detail: 'Datos actualizados',
            life: 3000
          });
        })
      );
  }

  public getOneFictionBook(number: number): Observable<FictionBook> {
    return this.ucroniaClient.library.fictionBook.get(number);
  }

  public deleteFictionBook(number: number): Observable<FictionBook> {
    return this.ucroniaClient.library.fictionBook.delete(number)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Borrado',
            detail: 'Datos borrados',
            life: 3000
          });
        }),
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo borrar el registro',
            life: 5000
          });
          return throwError(() => error);
        })
      );
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

  public searchAuthors(query: string): Observable<Author[]> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    const search = query?.trim().toLowerCase();

    return this.ucroniaClient.library.author.page(undefined, 1000, sorting)
      .pipe(
        map(page => page.content as Author[]),
        map(authors => authors.filter(author => author.name.toLowerCase().includes(search))),
        map(authors => authors.slice(0, 10))
      );
  }

  public getPublishers(page: number | undefined = undefined): Observable<Page<Publisher>> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    return this.ucroniaClient.library.publisher.page(page, undefined, sorting);
  }

  public searchPublishers(query: string): Observable<Publisher[]> {
    const sorting = new Sorting(
      [new SortingProperty('name')]
    );

    const search = query?.trim().toLowerCase();

    return this.ucroniaClient.library.publisher.page(undefined, 1000, sorting)
      .pipe(
        map(page => page.content as Publisher[]),
        map(publishers => publishers.filter(publisher => publisher.name.toLowerCase().includes(search))),
        map(publishers => publishers.slice(0, 10))
      );
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
    return this.ucroniaClient.library.lending.lend(data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Prestado',
            detail: 'Libro prestado',
            life: 3000
          });
        })
      );
  }

  public return(data: BookReturned): Observable<BookLending> {
    return this.ucroniaClient.library.lending.return(data)
      .pipe(
        tap(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Devuelto',
            detail: 'Libro devuelto',
            life: 3000
          });
        })
      );
  }

  public searchMembers(query: string, active: MemberStatus = MemberStatus.Active): Observable<PublicMember[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.memberProfile.page(undefined, 10, sorting, active, query)
      .pipe(map(page => page.content as PublicMember[]));
  }

  public searchDonors(query: string): Observable<Donor[]> {
    const sorting = new Sorting(
      [
        new SortingProperty('name.firstName'),
        new SortingProperty('name.lastName'),
        new SortingProperty('number')
      ]
    );

    return this.ucroniaClient.profile.page(undefined, 10, sorting, query)
      .pipe(map(page => page.content as Donor[]));
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
