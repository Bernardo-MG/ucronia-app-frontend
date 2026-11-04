import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { TransactionType } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of, Subject, throwError } from 'rxjs';
import { TransactionTypeList } from './transaction-type-list';

describe('TransactionTypeList', () => {
  let fixture: ComponentFixture<TransactionTypeList>;
  let page: jasmine.Spy;

  function response(number = 1): Page<TransactionType> {
    return Object.assign(new Page<TransactionType>(), {
      page: number,
      size: 10,
      totalElements: 11,
      totalPages: 2,
      content: [{ number, description: 'Donación', color: '#123456' }]
    });
  }

  beforeEach(() => {
    page = jasmine.createSpy('page').and.callFake((number: number) => of(response(number)));
    TestBed.configureTestingModule({
      imports: [TransactionTypeList],
      providers: [
        provideZonelessChangeDetection(),
        ConfirmationService,
        { provide: UcroniaClient, useValue: { transactionType: { page } } }
      ]
    });
    fixture = TestBed.createComponent(TransactionTypeList);
    fixture.componentRef.setInput('version', 0);
  });

  it('shows loading while requesting the first page and then renders the types', () => {
    const result = new Subject<Page<TransactionType>>();
    page.and.returnValue(result);

    fixture.detectChanges();

    expect(page).toHaveBeenCalledOnceWith(1, 10);
    expect(fixture.nativeElement.querySelector('[role="status"]')).not.toBeNull();

    result.next(response());
    result.complete();
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table');
    expect(table.textContent).toContain('Donación');
    expect(table.textContent).toContain('#123456');
    expect(fixture.componentInstance.loading).toBeFalse();
  });

  it('converts the paginator index to a one-based page and refreshes that page', () => {
    fixture.detectChanges();
    fixture.componentInstance.changePage({ page: 1 });

    expect(page).toHaveBeenCalledWith(2, 10);
    expect(fixture.componentInstance.data.page).toBe(2);
    page.calls.reset();

    fixture.componentRef.setInput('version', 1);
    fixture.detectChanges();

    expect(page).toHaveBeenCalledOnceWith(2, 10);
  });

  it('shows an error and retries the request', () => {
    page.and.returnValue(throwError(() => new Error('Request failed')));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    expect(fixture.componentInstance.loading).toBeFalse();

    page.and.returnValue(of(response()));
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();

    expect(page).toHaveBeenCalledTimes(2);
    expect(page).toHaveBeenCalledWith(1, 10);
    expect(fixture.nativeElement.querySelector('[role="alert"]')).toBeNull();
  });

  it('shows an empty state when no types are registered', () => {
    page.and.returnValue(of(new Page<TransactionType>()));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('No hay tipos de transacción registrados.');
  });
});
