import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '@bernardo-mg/authentication';
import { UcroniaPermissions } from '@ucronia/auth';
import { LibrarySettingsLayout } from './library-settings-layout';

describe('LibrarySettingsLayout', () => {
  it('only shows readable catalogs and hides the book link without book access', async () => {
    const authService = jasmine.createSpyObj<AuthService>('AuthService', ['hasPermission']);
    authService.hasPermission.and.callFake(permission => permission === UcroniaPermissions.library.publisher.read);
    await TestBed.configureTestingModule({
      imports: [LibrarySettingsLayout],
      providers: [provideRouter([]), { provide: AuthService, useValue: authService }]
    }).compileComponents();
    const fixture = TestBed.createComponent(LibrarySettingsLayout);
    fixture.detectChanges();
    const links = Array.from(fixture.nativeElement.querySelectorAll('a')) as HTMLAnchorElement[];
    expect(links.map(link => link.textContent!.trim())).toEqual(['Editoriales']);
  });
});
