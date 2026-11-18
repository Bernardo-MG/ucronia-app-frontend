import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ActivityService } from './activity-service';
import { Page, Sorting } from '@bernardo-mg/request';
import { Activity } from '@ucronia/domain';

describe('ActivityService', () => {
  let service: ActivityService;

  const mockUcroniaClient = {
    activity: {
      create: jasmine.createSpy().and.returnValue(of({})),
      update: jasmine.createSpy().and.returnValue(of({})),
      get: jasmine.createSpy().and.returnValue(of({})),
      delete: jasmine.createSpy().and.returnValue(of({})),
      page: jasmine.createSpy().and.returnValue(of({
        content: [],
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
      }))
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        { provide: UcroniaClient, useValue: mockUcroniaClient }
      ]
    });
    service = TestBed.inject(ActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('activity-service backend results', () => {
  it('forwards activity dates and preserves the server page without fetching other pages', () => {
    const result = Object.assign(new Page<Activity>(), { content: [new Activity()], totalElements: 50, last: false });
    const endpoint = { page: jasmine.createSpy().and.returnValue(of(result)) };
    TestBed.configureTestingModule({ providers: [
      { provide: UcroniaClient, useValue: { activity: endpoint } }, MessageService
    ] });
    const from = new Date(2025, 0, 1);
    const to = new Date(2025, 11, 31);
    TestBed.inject(ActivityService).getAll(3, new Sorting(), from, to).subscribe(page => expect(page).toBe(result));
    expect(endpoint.page).toHaveBeenCalledOnceWith(3, undefined, jasmine.any(Sorting), from, to);
  });
});
