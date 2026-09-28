import { TestBed } from '@angular/core/testing';
import { UcroniaClient } from '@ucronia/api';
import { StoredFile } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { FileService } from './file-service';

describe('FileService', () => {
  let service: FileService;
  const file = Object.assign(new StoredFile(), {
    number: 1, name: 'Document', description: 'Description', mediaType: 'application/pdf', publicAccess: false
  });
  const client = {
    file: {
      page: jasmine.createSpy().and.returnValue(of({ content: [], last: true, page: 1 })),
      get: jasmine.createSpy().and.returnValue(of(file)),
      content: jasmine.createSpy().and.returnValue(of(new Blob(['data'], { type: 'application/pdf' }))),
      create: jasmine.createSpy().and.returnValue(of(file)),
      update: jasmine.createSpy().and.returnValue(of(file)),
      patch: jasmine.createSpy().and.returnValue(of(file)),
      delete: jasmine.createSpy().and.returnValue(of(file))
    }
  };

  beforeEach(() => {
    for (const spy of Object.values(client.file)) spy.calls.reset();
    TestBed.configureTestingModule({ providers: [MessageService, { provide: UcroniaClient, useValue: client }] });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should upload a file', () => {
    const content = new File(['data'], 'document.pdf', { type: 'application/pdf' });
    service.create(file, content).subscribe();
    expect(client.file.create).toHaveBeenCalledWith(file.name, file.description, file.publicAccess, content);
  });

  it('should load all files ordered by name for selectors', () => {
    service.getAllForSelection().subscribe();

    expect(client.file.page).toHaveBeenCalledWith(1, 100, jasmine.anything());
  });

  it('should load file content through the API client', () => {
    service.content(file.number).subscribe();

    expect(client.file.content).toHaveBeenCalledWith(file.number);
  });

  it('should update only metadata when no replacement file is supplied', () => {
    service.update(file).subscribe();
    expect(client.file.patch).toHaveBeenCalledWith(file.number, file.name, file.description, file.publicAccess);
    expect(client.file.content).not.toHaveBeenCalled();
    expect(client.file.update).not.toHaveBeenCalled();
  });

  it('should preserve visibility when replacing file content', () => {
    const content = new File(['replacement'], 'replacement.pdf', { type: 'application/pdf' });
    service.update(file, content).subscribe();
    expect(client.file.update)
      .toHaveBeenCalledWith(file.number, file.name, file.description, file.publicAccess, content);
  });

  it('should delete a file', () => {
    service.delete(file.number).subscribe();
    expect(client.file.delete).toHaveBeenCalledWith(file.number);
  });
});
