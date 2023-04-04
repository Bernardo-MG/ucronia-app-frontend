import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { DataListComponent } from './data-list.component';
import { ButtonsModule } from '@app/shared/buttons/buttons.module';

describe('DataListComponent', () => {
  let component: DataListComponent;
  let fixture: ComponentFixture<DataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PaginationModule,
        ButtonsModule
      ],
      declarations: [
        DataListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
