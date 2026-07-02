import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorRequestInterceptor, Page, PaginatedResponse, SimpleResponse, Sorting } from '@bernardo-mg/request';
import { ScheduledGame } from '@ucronia/domain';
import { catchError, map, Observable } from 'rxjs';
import { ScheduledGameEdition } from '../../calendar/scheduled-game-edition';

export class ScheduledGameEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  private mapScheduledGame(scheduledGame: ScheduledGame): ScheduledGame {
    scheduledGame.start = new Date(scheduledGame.start);
    return scheduledGame;
  }

  private mapScheduledGames(page: PaginatedResponse<ScheduledGame>): PaginatedResponse<ScheduledGame> {
    page.content = page.content.map(a => this.mapScheduledGame(a));

    return page;
  }

  public page(
    page: number | undefined = undefined,
    size: number | undefined = undefined,
    sort: Sorting | undefined = undefined
  ): Observable<Page<ScheduledGame>> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (size) {
      params = params.append('size', size);
    }

    sort?.properties
      .forEach((property) => params = params.append('sort', `${String(property.property)}|${property.direction}`));

    return this.http.get<PaginatedResponse<ScheduledGame>>(`${this.apiUrl}/game`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(r => this.mapScheduledGames(r))
      );
  }

  public get(
    index: number
  ): Observable<ScheduledGame> {
    return this.http.get<SimpleResponse<ScheduledGame>>(`${this.apiUrl}/game/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => this.mapScheduledGame(r))
      );
  }

  public create(
    data: ScheduledGameEdition
  ): Observable<ScheduledGame> {
    return this.http.post<SimpleResponse<ScheduledGame>>(`${this.apiUrl}/game`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => this.mapScheduledGame(r))
      );
  }

  public update(
    index: number,
    data: ScheduledGameEdition
  ): Observable<ScheduledGame> {
    return this.http.put<SimpleResponse<ScheduledGame>>(`${this.apiUrl}/game/${index}`, data)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => this.mapScheduledGame(r))
      );
  }

  public delete(
    index: number
  ): Observable<ScheduledGame> {
    return this.http.delete<SimpleResponse<ScheduledGame>>(`${this.apiUrl}/game/${index}`)
      .pipe(
        catchError(this.errorInterceptor.handle),
        map(response => response.content),
        map(r => this.mapScheduledGame(r))
      );
  }

}
