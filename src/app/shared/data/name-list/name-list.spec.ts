import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NameList } from './name-list';
import { Confirmation, ConfirmationService } from 'primeng/api';

describe('NameList', () => {
  let component: NameList;
  let fixture: ComponentFixture<NameList>;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameList],
      providers: [ConfirmationService]
    }).compileComponents();

    fixture = TestBed.createComponent(NameList);
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

});
