import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudNameList } from './crud-name-list';
import { Confirmation, ConfirmationService } from 'primeng/api';

describe('CrudNameList', () => {
  let component: CrudNameList;
  let fixture: ComponentFixture<CrudNameList>;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudNameList],
      providers: [ConfirmationService]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudNameList);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate first correctly', () => {
    component.data().page = 2;
    component.data().size = 10;

    expect(component.first).toBe(10);
  });

  it('should emit create event', () => {
    spyOn(component.startCreating, 'emit' as any);

    component.onStartCreating();

    expect(component.startCreating.emit).toHaveBeenCalled();
  });

  it('should emit edit event', () => {
    spyOn(component.startEditing, 'emit' as any);

    component.onStartEditing({ id: 1 });

    expect(component.startEditing.emit).toHaveBeenCalledWith({ id: 1 });
  });

  it('should emit show event', () => {
    spyOn(component.show, 'emit' as any);

    component.onShow({ id: 1, name: 'Test' });

    expect(component.show.emit).toHaveBeenCalledWith({ id: 1, name: 'Test' });
  });

  it('should emit page changes', () => {
    spyOn(component.pageChange, 'emit' as any);

    component.onPageChange({ first: 20, rows: 10 } as any);

    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should emit sort changes', () => {
    spyOn(component.sortChange, 'emit' as any);

    component.onChangeDirection({ field: 'name', order: 1 });

    expect(component.sortChange.emit).toHaveBeenCalledWith({ field: 'name', order: 1 });
  });

  it('should confirm delete and emit deleted event on accept', () => {
    spyOn(confirmationService, 'confirm').and.callFake(
      (confirmation: Confirmation) => (confirmation as any).accept()
    );
    spyOn(component.deleted, 'emit' as any);
    const mockEvent = new Event('click');

    component.onDelete(mockEvent, 123);

    expect(component.deleted.emit).toHaveBeenCalledWith(123);
  });

});
