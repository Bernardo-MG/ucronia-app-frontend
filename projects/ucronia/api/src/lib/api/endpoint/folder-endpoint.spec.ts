import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FolderEndpoint } from './folder-endpoint';

describe('FolderEndpoint', () => {
  let endpoint: FolderEndpoint;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    endpoint = new FolderEndpoint(TestBed.inject(HttpClient), 'http://localhost/api');
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should manage folders through the shared asset folders endpoint', () => {
    endpoint.folders().subscribe();
    const listRequest = http.expectOne('http://localhost/api/asset/folders');
    expect(listRequest.request.method).toBe('GET');
    listRequest.flush([]);

    endpoint.createFolder('Images', null).subscribe();
    const createRequest = http.expectOne('http://localhost/api/asset/folders');
    expect(createRequest.request.method).toBe('POST');
    expect(createRequest.request.body).toEqual({ name: 'Images', parentNumber: null });
    createRequest.flush({ number: 1, name: 'Images', parentNumber: null });

    endpoint.updateFolder(1, 'Photos', null).subscribe();
    const updateRequest = http.expectOne('http://localhost/api/asset/folders/1');
    expect(updateRequest.request.method).toBe('PUT');
    updateRequest.flush({ number: 1, name: 'Photos', parentNumber: null });

    endpoint.deleteFolder(1).subscribe();
    const deleteRequest = http.expectOne('http://localhost/api/asset/folders/1');
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush({ number: 1, name: 'Photos', parentNumber: null });
  });

  it('should filter folder assets by type and supply defaults', () => {
    let names: string[] = [];
    endpoint.page(3, 'IMAGE').subscribe(page => {
      names = page.content.map(asset => asset.name);
      expect(page.content[0].type).toBe('IMAGE');
      expect(page.content[0].publicAccess).toBe(true);
    });

    const request = http.expectOne('http://localhost/api/asset/folders/3/assets');
    expect(request.request.method).toBe('GET');
    request.flush({
      content: [
        { number: 1, name: 'Document', type: 'FILE' },
        { number: 2, name: 'Image' }
      ]
    });

    expect(names).toEqual(['Image']);
  });

  it('should use the root asset folder when no folder is selected', () => {
    endpoint.page(null, 'FILE').subscribe();

    const request = http.expectOne('http://localhost/api/asset/folders/root/assets');
    expect(request.request.method).toBe('GET');
    request.flush({ content: [] });
  });

  it('should move assets through the shared folder endpoint', () => {
    let movedType: string | undefined;
    endpoint.moveToFolder(8, 3, 'IMAGE').subscribe(asset => movedType = asset.type);

    const request = http.expectOne('http://localhost/api/asset/folders/3/assets/8');
    expect(request.request.method).toBe('PUT');
    request.flush({ content: { number: 8 } });

    expect(movedType).toBe('IMAGE');
  });
});