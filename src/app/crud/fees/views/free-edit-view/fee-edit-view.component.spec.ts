import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeService } from '../../services/fee.service';

import { FeeEditViewComponent } from './fee-edit-view.component';

describe('FeeEditViewComponent', () => {
  let component: FeeEditViewComponent;
  let fixture: ComponentFixture<FeeEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        FeeEditViewComponent
      ],
      providers: [
        FeeService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
