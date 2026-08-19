import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Key } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { TablePageEvent } from 'primeng/table';
import { KeyList } from './key-list';

describe('KeyList', () => {
  let component: KeyList;
  let fixture: ComponentFixture<KeyList>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    confirmationService = jasmine.createSpyObj<ConfirmationService>(
      'ConfirmationService',
      ['confirm']
    );

    await TestBed.configureTestingModule({
      imports: [KeyList],
      providers: [
        {
          provide: ConfirmationService,
          useValue: confirmationService
        }
      ]
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

  it('should request confirmation before deleting a key', () => {
    const target = document.createElement('button');
    const event = { currentTarget: target } as unknown as Event;
    const key = { number: 4 } as Key;

    component.confirmDelete(event, key);

    expect(confirmationService.confirm).toHaveBeenCalled();

    const confirmation =
      confirmationService.confirm.calls.mostRecent().args[0];

    expect(confirmation).toEqual(
      jasmine.objectContaining({
        target,
        message: '¿Estás seguro de querer borrar? Esta acción no es revertible',
        icon: 'pi pi-info-circle',
        rejectButtonProps: jasmine.objectContaining({
          label: 'Cancelar',
          severity: 'secondary',
          outlined: true
        }),
        acceptButtonProps: jasmine.objectContaining({
          label: 'Borrar',
          severity: 'danger'
        })
      })
    );
  });

  it('should emit the key number when deletion is accepted', () => {
    const emitSpy = spyOn(component.delete, 'emit');
    const event = {
      currentTarget: document.createElement('button')
    } as unknown as Event;
    const key = { number: 8 } as Key;

    component.confirmDelete(event, key);

    const confirmation =
      confirmationService.confirm.calls.mostRecent().args[0];

    confirmation.accept?.();

    expect(emitSpy).toHaveBeenCalledOnceWith(8);
  });
});
