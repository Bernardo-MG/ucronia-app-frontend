import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Sorting, SortingProperty } from '@bernardo-mg/request';
import { KeyAssignment } from '@ucronia/domain';
import { KeyAssignmentEndpoint } from './key-assignment-endpoint';

describe('KeyAssignmentEndpoint', () => {
  let endpoint: KeyAssignmentEndpoint;
  let http: HttpTestingController;

  const assigned: KeyAssignment = {
    number: 7,
    available: true,
    description: 'Principal',
    profile: { number: 10, name: 'Ana García' }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    endpoint = new KeyAssignmentEndpoint(TestBed.inject(HttpClient), '/api');
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should request sorted assignment pages and retain assigned and unassigned keys', () => {
    const unassigned: KeyAssignment = { number: 8, available: false, description: 'Lateral', profile: null };
    const sorting = new Sorting([new SortingProperty('number')]);

    endpoint.page(2, 100, sorting).subscribe(response => {
      expect(response.content).toEqual([assigned, unassigned]);
    });
    const request = http.expectOne('/api/profile/key/assignments?page=2&size=100&sort=number%7Casc');

    expect(request.request.method).toBe('GET');
    request.flush({ content: [assigned, unassigned], page: 2, last: true });
  });

  it('should create an assignment using key and profile numbers', () => {
    const data = { number: 7, profile: 10 };

    endpoint.create(data).subscribe(response => expect(response).toEqual(assigned));
    const request = http.expectOne('/api/profile/key/assignments');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBe(data);
    request.flush({ content: assigned });
  });

  it('should replace the profile using the key number in the path', () => {
    const data = { profile: 10 };

    endpoint.update(7, data).subscribe(response => expect(response).toEqual(assigned));
    const request = http.expectOne('/api/profile/key/assignments/7');

    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toBe(data);
    request.flush({ content: assigned });
  });

  it('should remove an assignment without calling the key deletion endpoint', () => {
    endpoint.delete(7).subscribe(response => expect(response).toEqual(assigned));
    const request = http.expectOne('/api/profile/key/assignments/7');

    expect(request.request.method).toBe('DELETE');
    request.flush({ content: assigned });
  });
});
