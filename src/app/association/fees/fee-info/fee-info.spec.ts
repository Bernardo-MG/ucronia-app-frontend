import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Fee } from '@ucronia/domain';
import { EMPTY } from 'rxjs';
import { FeeService } from '../fee-service';
import { FeeInfo } from './fee-info';

describe('FeeInfo', () => {
  let component: FeeInfo;
  let fixture: ComponentFixture<FeeInfo>;
  let service: FeeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj('FeeService', ['getMembers', 'getFields']);
    (service as any).getMembers.and.returnValue(EMPTY);
    (service as any).getFields.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [
        FeeInfo
      ],
      providers: [
        { provide: FeeService, useValue: service },
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('shows fee audit details and hides them while loading', () => {
    const fee = new Fee();
    fee.audit = {
      createdAt: new Date('2026-11-01T12:00:00Z'),
      createdBy: { name: 'Ana' },
      updatedAt: new Date('2026-11-02T12:00:00Z'),
      updatedBy: { username: 'editor' }
    };
    fixture.componentRef.setInput('data', fee);
    fixture.detectChanges();

    const audit = fixture.nativeElement.querySelector('assoc-audit-info');
    expect(audit.textContent).toContain('Creado el');
    expect(audit.textContent).toContain('Ana');
    expect(audit.textContent).toContain('Actualizado el');
    expect(audit.textContent).toContain('editor');

    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    expect(audit.textContent.trim()).toBe('');
  });

});
