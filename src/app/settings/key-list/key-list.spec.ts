import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Key } from '@ucronia/domain';
import { TablePageEvent } from 'primeng/table';
import { KeyList } from './key-list';

describe('KeyList', () => {
  let component: KeyList;
  let fixture: ComponentFixture<KeyList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeyList],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(KeyList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render key information and mark missing keys', () => {
    fixture.componentRef.setInput('data', [
      {
        number: 4,
        available: false,
        description: 'Puerta lateral'
      } as Key,
      {
        number: 8,
        available: true,
        description: 'Garaje'
      } as Key
    ]);
    fixture.componentRef.setInput('rows', 10);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('totalRecords', 2);

    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;

    expect(text).toContain('4');
    expect(text).toContain('Puerta lateral');
    expect(text).toContain('Perdida');
    expect(text).toContain('8');
    expect(text).toContain('Garaje');
    expect(text).toContain('Total: 2');
  });

  it('should calculate the first row from the current page and page size', () => {
    fixture.componentRef.setInput('page', 3);
    fixture.componentRef.setInput('rows', 10);

    expect(component.first).toBe(20);
  });

  it('should emit the selected page when pagination changes', () => {
    const emitSpy = spyOn(component.changePage, 'emit');

    component.onPageChange({
      first: 20,
      rows: 10
    } as TablePageEvent);

    expect(emitSpy).toHaveBeenCalledOnceWith(3);
  });

  it('should show key details without table deletion controls', () => {
    fixture.componentRef.setInput('data', [{ number: 4, available: true, description: 'Puerta' }]);
    fixture.componentRef.setInput('rows', 10);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('totalRecords', 1);
    fixture.detectChanges();
    const emitSpy = spyOn(component.show, 'emit');
    fixture.nativeElement.querySelector('button[aria-label="Ver detalles"]').click();
    expect(emitSpy).toHaveBeenCalledOnceWith(component.data()[0]);
    expect(fixture.nativeElement.querySelector('.pi-trash')).toBeNull();
    expect(fixture.nativeElement.querySelector('.pi-ellipsis-v')).toBeNull();
  });
});
