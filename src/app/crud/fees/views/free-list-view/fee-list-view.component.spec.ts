import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeService } from '../../services/fee.service';

import { FeeListViewComponent } from './fee-list-view.component';

describe('FreeListViewComponent', () => {
  let component: FeeListViewComponent;
  let fixture: ComponentFixture<FeeListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        FeeListViewComponent
      ],
      providers: [
        FeeService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
