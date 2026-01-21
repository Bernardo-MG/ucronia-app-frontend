import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse, Sorting, SortingDirection, SortingParams, SortingProperty } from '@bernardo-mg/request';
import { Member, MemberStatus } from '@ucronia/domain';
import { catchError, Observable } from 'rxjs';
import { ErrorRequestInterceptor } from '../error-request-interceptor';

export class MemberEndpoint {

  private readonly errorInterceptor = new ErrorRequestInterceptor();

  public constructor(
    private http: HttpClient,
    private apiUrl: string
  ) { }

  public getAll(page: number | undefined = undefined, sort: Sorting, active: MemberStatus, name: string): Observable<PaginatedResponse<Member>> {
    const sorting = new SortingParams(
      sort.properties,
      [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')]
    );
    const defaultProperties = [new SortingProperty('firstName'), new SortingProperty('lastName'), new SortingProperty('number')];

    let status;
    if (active) {
      status = active.toString().toUpperCase();
    } else {
      status = '';
    }

    const params = new HttpParams();
    if (page) {
      params.append('page', page);
    }

    this.getFinalProperties(sort.properties, defaultProperties)
      .forEach((property) => params.append('sort', `${String(property.property)}|${property.direction}`));

    params.append('status', status);
    params.append('name', name);

    return this.http.get<PaginatedResponse<Member>>(`${this.apiUrl}/member`, { params })
      .pipe(
        catchError(this.errorInterceptor.handle)
      );
  }

  private getFinalProperties(properties: SortingProperty[], defaultProperties: SortingProperty[]): SortingProperty[] {
    let sortFields;

    // Remove unsorted fields
    const validSortings = properties.filter(f => f.direction != SortingDirection.Unsorted);
    if (validSortings.length === 0) {
      // Use default sorts if no sorting was received
      sortFields = defaultProperties;
    } else {
      // Merge default sorting with the received one

      // Apply default sortings to those fields which are not sorted
      const sortedProperties = validSortings.map(f => f.property);
      const defaultSortFields = defaultProperties.filter(f =>
        (f.direction == SortingDirection.Unsorted) || (!sortedProperties.includes(f.property))
      );

      sortFields = validSortings.concat(defaultSortFields);
    }

    // Remove duplicates
    return sortFields.filter((field, index, self) =>
      index === self.findIndex(f => f.property === field.property)
    );
  }

}