import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CrudService } from '@app/shared/data/services/crud-service';
import { FailureResponse, Page, Sorting } from '@bernardo-mg/request';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { CrudNameList } from './crud-name-list';

describe('CrudNameList', () => {
  let component: CrudNameList;
  let fixture: ComponentFixture<CrudNameList>;
  let mockService: jasmine.SpyObj<CrudService<any>>;
  let confirmationService: ConfirmationService;
  let messageService: MessageService;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('CrudService', ['getAll', 'create', 'update', 'delete']);
    mockService.getAll.and.returnValue(of(new Page()));
    mockService.create.and.returnValue(of({}));
    mockService.update.and.returnValue(of({}));
    mockService.delete.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [CrudNameList],
      providers: [
        provideAnimationsAsync(),
        ConfirmationService,
        MessageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudNameList);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    messageService = TestBed.inject(MessageService);

    fixture.componentRef.setInput('service', mockService);
    fixture.componentRef.setInput('entityKey', 'testEntity');
    fixture.detectChanges();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load on init', () => {
    expect(mockService.getAll).toHaveBeenCalledWith(0, jasmine.any(Sorting));
  });

  describe('sorting', () => {

    it('should change sorting direction to ascending', () => {
      spyOn(component as any, 'load');

      component.onChangeDirection({ field: 'name', order: 1 });

      expect((component as any).sort.properties.length).toBeGreaterThan(0);
      expect((component as any).load).toHaveBeenCalled();
    });

    it('should change sorting direction to descending', () => {
      spyOn(component as any, 'load');

      component.onChangeDirection({ field: 'name', order: -1 });

      expect((component as any).sort.properties.length).toBeGreaterThan(0);
      expect((component as any).load).toHaveBeenCalled();
    });

  });

  describe('pagination', () => {

    it('should calculate first correctly', () => {
      component.data.page = 2;
      component.data.size = 10;

      expect(component.first).toBe(10);
    });

    it('should handle page change', () => {
      spyOn(component as any, 'load');
      component.data.size = 10;

      component.onPageChange({ first: 20, rows: 10 } as any);

      expect((component as any).load).toHaveBeenCalledWith(3);
    });

  });

  describe('shown form', () => {

    it('should toggle creation', () => {
      component.onStartCreating();
      expect(component.view).toBe('creation');
      expect(component.showForm).toBeTrue();
    });

    it('should toggle edition', () => {
      component.onStartEditing({ id: 1 });
      expect(component.view).toBe('edition');
      expect(component.selected).toEqual({ id: 1 });
    });

    it('should toggle back on cancel', () => {
      component.onCancel();
      expect(component.view).toBe('none');
      expect(component.showForm).toBeFalse();
    });

  });

  describe('callbacks', () => {

    it('should call service on onCreate', () => {
      spyOn(component as any, 'load');
      component.onCreate({ id: 123 });

      expect(mockService.create).toHaveBeenCalledWith({ id: 123 });
    });

    it('should call service on onUpdate', () => {
      spyOn(component as any, 'load');
      component.onUpdate({ id: 123 });
      expect(mockService.update).toHaveBeenCalledWith({ id: 123 });
    });

    it('should confirm delete and call service on accept', () => {
      spyOn(confirmationService, 'confirm').and.callFake(
        (confirmation: Confirmation) => (confirmation as any).accept()
      );
      spyOn(component as any, 'load');

      component.onDelete(new Event('click'), 123);

      expect(mockService.delete).toHaveBeenCalledWith(123);
      expect((component as any).load).toHaveBeenCalled();
    });

  });

  describe('messages', () => {

    it('should show message after create', () => {
      spyOn(messageService, 'add');

      component.onCreate({ id: 1 });

      expect(messageService.add).toHaveBeenCalledWith(jasmine.objectContaining({
        severity: 'info',
        summary: 'Creado'
      }));
    });

    it('should show message after update', () => {
      spyOn(messageService, 'add');

      component.onUpdate({ id: 1 });

      expect(messageService.add).toHaveBeenCalledWith(jasmine.objectContaining({
        severity: 'info',
        summary: 'Actualizado'
      }));
    });

    it('should show message after delete', () => {
      spyOn(confirmationService, 'confirm').and.callFake(
        (confirmation: Confirmation) => (confirmation as any).accept()
      );
      spyOn(messageService, 'add');

      component.onDelete(new Event('click'), 1);

      expect(messageService.add).toHaveBeenCalledWith(jasmine.objectContaining({
        severity: 'info',
        summary: 'Borrado'
      }));
    });

  });

  describe('failures', () => {

    it('should handle failures in call', () => {
      const failure = new FailureResponse({ 'field': [{ field: 'password', message: 'too weak' }] });
      mockService.create.and.returnValue(throwError(() => failure));

      component.onCreate({ id: 1 });

      expect(component.loading).toBeFalse();
      expect(component.failures).toBe(failure.failures);
    });

    it('should clear failures on non-FailureResponse error', () => {
      spyOn(component.failures, 'clear');
      mockService.update.and.returnValue(throwError(() => new Error('Unknown error')));

      component.onUpdate({ id: 99 });

      expect(component.failures.clear).toHaveBeenCalled();
    });

  });

  describe('permissions', () => {

    it('should disable create button when there are no permission', () => {
      (component as any).auth.hasPermission = () => false;
      component.ngOnInit();

      expect(component.canCreate).toBeFalse();
    });

    it('should allow create button when has permission and not loading', () => {
      (component as any).auth.hasPermission = () => true;
      component.ngOnInit();
      
      expect(component.canCreate).toBeTrue();
    });

  });

});
