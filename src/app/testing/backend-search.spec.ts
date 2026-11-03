import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Page, Sorting } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Activity, Asset, BookLending, Profile, ScheduledGame } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ActivityService } from '../association/activities/activity-service';
import { LibraryLendingService } from '../association/library/library-lending-service';
import { LibraryService } from '../association/library/library-service';
import { ScheduledGameService } from '../association/scheduled-game/scheduled-game-service';
import { RoleForm } from '../security/roles/role-form/role-form';
import { RoleInfo } from '../security/roles/role-info/role-info';
import { RoleChangePermission } from '../security/roles/role-change-permission/role-change-permission';
import { UserForm } from '../security/users/user-form/user-form';
import { Role } from '@bernardo-mg/authentication';
import { mapAssetPage } from '../../../projects/ucronia/api/src/lib/api/endpoint/asset-endpoint-utils';
import { PaginatedResponse } from '@bernardo-mg/request';

describe('Backend-only search', () => {
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

  it('preserves scheduled-game and loan pages without synthesizing search results', () => {
    const games = Object.assign(new Page<ScheduledGame>(), { content: [new ScheduledGame()], totalElements: 35 });
    const loans = Object.assign(new Page<BookLending>(), { content: [new BookLending()], totalElements: 27 });
    const gamePage = jasmine.createSpy().and.returnValue(of(games));
    const loanPage = jasmine.createSpy().and.returnValue(of(loans));
    TestBed.configureTestingModule({ providers: [MessageService,
      { provide: UcroniaClient, useValue: { scheduledGame: { page: gamePage }, library: { lending: { page: loanPage } } } }
    ] });
    const sort = new Sorting();
    TestBed.inject(ScheduledGameService).getAll(2, sort).subscribe(page => expect(page).toBe(games));
    TestBed.inject(LibraryLendingService).getAll(3, sort).subscribe(page => expect(page).toBe(loans));
    expect(gamePage).toHaveBeenCalledOnceWith(2, undefined, jasmine.any(Sorting));
    expect(loanPage).toHaveBeenCalledOnceWith(3, undefined, sort);
  });

  it('forwards donor search to the backend and preserves its response', () => {
    const profiles = [Object.assign(new Profile(), { number: 1 }), Object.assign(new Profile(), { number: 2 })];
    const page = jasmine.createSpy().and.returnValue(of(Object.assign(new Page<Profile>(), { content: profiles })));
    TestBed.configureTestingModule({ providers: [MessageService,
      { provide: UcroniaClient, useValue: { profile: { page } } }
    ] });
    TestBed.inject(LibraryService).searchDonors('Ana').subscribe(results => expect(results).toBe(profiles));
    expect(page).toHaveBeenCalledOnceWith(undefined, 10, jasmine.any(Sorting), 'Ana');
  });

  it('preserves mixed asset types and server totals in folder responses', () => {
    const image = Object.assign(new Asset(), { number: 1, type: 'IMAGE' });
    const file = Object.assign(new Asset(), { number: 2, type: 'FILE' });
    const page = Object.assign(new PaginatedResponse<Asset>(), { content: [image, file], totalElements: 42 });
    const result = mapAssetPage(page, 'IMAGE');
    expect(result.content).toEqual([image, file]);
    expect(result.totalElements).toBe(42);
  });
});

describe('Unsupported permission and role searches', () => {
  const permissions = [
    { name: 'book:read', resource: 'book', action: 'read' },
    { name: 'fee:update', resource: 'fee', action: 'update' }
  ];

  for (const type of [RoleForm, RoleInfo, RoleChangePermission]) {
    it(`shows every permission and disables search in ${type.name}`, fakeAsync(() => {
      TestBed.configureTestingModule({ imports: [type] });
      const fixture = TestBed.createComponent(type as typeof RoleForm);
      fixture.componentRef.setInput(type === RoleInfo ? 'data' : 'selection', type === RoleInfo ? new Role('Reader', permissions) : permissions);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(fixture.componentInstance.permissionGroups.flatMap(group => group.permissions)).toEqual(permissions);
      expect(fixture.nativeElement.querySelector('input[type="search"]').disabled).toBeTrue();
    }));
  }

  it('shows all server-supplied role options with search disabled', fakeAsync(() => {
    TestBed.configureTestingModule({ imports: [UserForm] });
    const fixture = TestBed.createComponent(UserForm);
    const roles = [new Role('Admin', []), new Role('Reader', [])];
    fixture.componentRef.setInput('selection', roles);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(fixture.componentInstance.roleOptions).toEqual(roles);
    expect(fixture.nativeElement.querySelector('input[type="search"]').disabled).toBeTrue();
  }));
});
