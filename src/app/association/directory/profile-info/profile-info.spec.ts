import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FullProfile } from '../model/full-profile';
import { ProfileInfo } from './profile-info';

describe('ProfileInfo', () => {
  let component: ProfileInfo;
  let fixture: ComponentFixture<ProfileInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileInfo
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the assigned member number in member details', () => {
    const profile = Object.assign(new FullProfile(), {
      number: 812, memberNumber: 37, types: ['member']
    });
    fixture.componentRef.setInput('data', profile);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('N.º socio');
    expect(fixture.nativeElement.textContent).toContain('#37');
    expect(fixture.nativeElement.textContent).not.toContain('#812');
  });

  it('does not show a member number for other profiles', () => {
    fixture.componentRef.setInput('data', new FullProfile());
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('N.º socio');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
