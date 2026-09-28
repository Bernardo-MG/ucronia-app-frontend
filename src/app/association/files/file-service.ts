import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { StoredFile, FileFolder } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {

  private readonly client = inject(UcroniaClient);
  private readonly messages = inject(MessageService);

  public getAll(page: number | undefined, sort: Sorting, size: number | undefined = undefined): Observable<Page<StoredFile>> {
    return this.client.file.page(page, size, sort);
  }

  public getAllForSelection(): Observable<StoredFile[]> {
    const sorting = new Sorting([new SortingProperty('name')]);
    return getAllPages((page, size) => this.getAll(page, sorting, size));
  }

  public getFolders(): Observable<FileFolder[]> {
    return this.client.file.folders();
  }

  public getFolderFiles(folderNumber: number, page: number | undefined, sort: Sorting,
    size: number | undefined = undefined): Observable<Page<StoredFile>> {
    return this.client.file.folderPage(folderNumber, page, size, sort);
  }

  public getRootFiles(page: number | undefined, sort: Sorting,
    size: number | undefined = undefined): Observable<Page<StoredFile>> {
    return this.client.file.rootPage(page, size, sort);
  }

  public createFolder(name: string, parentNumber: number | null): Observable<FileFolder> {
    return this.client.file.createFolder(name, parentNumber)
      .pipe(tap(() => this.notify('Creada', 'Carpeta creada')));
  }

  public updateFolder(folder: FileFolder): Observable<FileFolder> {
    return this.client.file.updateFolder(folder.number, folder.name, folder.parentNumber)
      .pipe(tap(() => this.notify('Actualizada', 'Carpeta actualizada')));
  }

  public deleteFolder(number: number): Observable<FileFolder> {
    return this.client.file.deleteFolder(number)
      .pipe(tap(() => this.notify('Borrada', 'Carpeta borrada')));
  }

  public move(fileNumber: number, folderNumber: number | null): Observable<StoredFile> {
    const request = folderNumber === null ? this.client.file.moveToRoot(fileNumber)
      : this.client.file.moveToFolder(fileNumber, folderNumber);
    return request.pipe(tap(() => this.notify('Movido', 'Archivo movido')));
  }

  public get(number: number): Observable<StoredFile> {
    return this.client.file.get(number);
  }

  public content(number: number): Observable<Blob> {
    return this.client.file.content(number);
  }

  public contentUrl(number: number): string {
    return this.client.file.contentUrl(number);
  }

  public create(metadata: StoredFile, content: File): Observable<StoredFile> {
    return this.client.file.create(metadata.name, metadata.description, metadata.publicAccess, content)
      .pipe(tap(() => this.notify('Creado', 'Archivo creado')));
  }

  public update(metadata: StoredFile, content?: File): Observable<StoredFile> {
    let response: Observable<StoredFile>;

    if (content) {
      response = this.client.file.update(metadata.number, metadata.name, metadata.description,
        metadata.publicAccess, content);
    } else {
      response = this.client.file.patch(metadata.number, metadata.name, metadata.description, metadata.publicAccess);
    }
    response = response.pipe(tap(() => this.notify('Actualizado', 'Archivo actualizado')));

    return response;
  }

  public delete(number: number): Observable<StoredFile> {
    return this.client.file.delete(number)
      .pipe(tap(() => this.notify('Borrado', 'Archivo borrado')));
  }

  private notify(summary: string, detail: string): void {
    this.messages.add({ severity: 'info', summary, detail, life: 3000 });
  }
}
