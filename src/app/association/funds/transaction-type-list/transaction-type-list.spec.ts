import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Page } from '@bernardo-mg/request';
import { TransactionType } from '@ucronia/domain';
import { Paginator } from 'primeng/paginator';
import { TransactionTypeList } from './transaction-type-list';

describe('TransactionTypeList', () => {
  let fixture: ComponentFixture<TransactionTypeList>;

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
    TestBed.configureTestingModule({
      imports: [TransactionTypeList],
      providers: [provideZonelessChangeDetection()]
    });
    fixture = TestBed.createComponent(TransactionTypeList);
    fixture.componentRef.setInput('data', response());
  });

  it('renders the supplied transaction types', () => {
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('table');
    expect(table.textContent).toContain('Donación');
    expect(table.textContent).toContain('#123456');
  });

  it('shows loading and failure states from its inputs', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')).not.toBeNull();

    fixture.componentRef.setInput('loading', false);
    fixture.componentRef.setInput('failed', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
  });

  it('emits the selected transaction type number', () => {
    fixture.detectChanges();
    let selectedNumber: number | undefined;
    fixture.componentInstance.show.subscribe(number => selectedNumber = number);

    fixture.nativeElement.querySelector('button').click();

    expect(selectedNumber).toBe(1);
  });

  it('converts the paginator index to a one-based page', () => {
    fixture.detectChanges();
    let selectedPage: number | undefined;
    fixture.componentInstance.pageChange.subscribe(page => selectedPage = page);

    fixture.debugElement.query(By.directive(Paginator))
      .triggerEventHandler('onPageChange', { page: 1 });

    expect(selectedPage).toBe(2);
  });
});
