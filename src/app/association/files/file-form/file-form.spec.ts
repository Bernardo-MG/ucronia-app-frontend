import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Asset } from '@ucronia/domain';
import { FileForm } from './file-form';

describe('FileForm', () => {
  let component: FileForm;
  let fixture: ComponentFixture<FileForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FileForm] }).compileComponents();
    fixture = TestBed.createComponent(FileForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should load file metadata for editing', () => {
    const file = Object.assign(new Asset(), {
      number: 2, name: 'Rules', description: 'Association rules', publicAccess: false
    });
    fixture.componentRef.setInput('data', file);
    fixture.detectChanges();
    expect(component.form.get('name')?.value).toBe('Rules');
    expect(component.form.get('description')?.value).toBe('Association rules');
    expect(component.form.get('publicAccess')?.value).toBeFalse();
  });

  it('should default new files to public access', () => {
    expect(component.form.get('publicAccess')?.value).toBeTrue();
  });
});
