import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatedResponse } from '@bernardo-mg/request';
import { TableModule } from 'primeng/table';
import { of } from 'rxjs';
import { NameNumber } from '../model/name-number';
import { SelectionList } from './selection-list';

describe('SelectionList', () => {
  let component: SelectionList;
  let fixture: ComponentFixture<SelectionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionList, TableModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionList);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('getSelection', (page: number) => {
      const response = new PaginatedResponse<NameNumber>();
      response.page = page;
      response.size = 10;
      response.totalElements = 30;
      response.content = [
        { name: 'Alice', number: 1 },
        { name: 'Bob', number: 2 }
      ];
      return of(response);
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data on init', (done) => {
    component.ngOnInit();

    setTimeout(() => {
      expect(component.selection.page).toBe(0);
      expect(component.selection.content.length).toBe(2);
      done();
    }, 0);
  });

  describe('pagination', () => {

    it('should calculate first correctly', () => {
      component.selection.page = 2;
      component.selection.size = 10;
      expect(component.first).toBe(10);
    });

    it('should go to a specific page', (done) => {
      const event = { first: 20 } as any;

      component.onGoToSelectionPage(event);

      setTimeout(() => {
        expect(component.selection.page).toBe(3);
        expect(component.selection.content.length).toBe(2);
        done();
      }, 0);
    });

  });

  it('should use heading and nameRenderer inputs', () => {
    fixture.componentRef.setInput('heading', 'Test Heading');
    fixture.componentRef.setInput('nameRenderer', (row: any) => `Row: ${row.name}`);

    expect(component.heading()).toBe('Test Heading');
    expect(component.nameRenderer()({ name: 'name' })).toBe('Row: name');
  });

});
