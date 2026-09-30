import { inject, Injectable } from '@angular/core';
import { getAllPages } from '@app/shared/request/get-all-pages';
import { Page, Sorting, SortingProperty } from '@bernardo-mg/request';
import { UcroniaClient } from '@ucronia/api';
import { Asset, AssetFolder } from '@ucronia/domain';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileService {

  private readonly client = inject(UcroniaClient);
  private readonly messages = inject(MessageService);

  public getAll(page: number | undefined, sort: Sorting, size: number | undefined = undefined): Observable<Page<Asset>> {
    return this.client.asset.file.page(page, size, sort);
  }

  public getAllForSelection(): Observable<Asset[]> {
    const sorting = new Sorting([new SortingProperty('name')]);
    return getAllPages((page, size) => this.getAll(page, sorting, size));
  }

  public getFolders(): Observable<AssetFolder[]> {
    return this.client.asset.folder.folders();
  }

  public getFolderFiles(folderNumber: number, page: number | undefined, sort: Sorting,
    size: number | undefined = undefined): Observable<Page<Asset>> {
    return this.client.asset.folder.page(folderNumber, 'FILE', page, size, sort);
  }

  public getRootFiles(page: number | undefined, sort: Sorting,
    size: number | undefined = undefined): Observable<Page<Asset>> {
    return this.client.asset.folder.page(null, 'FILE', page, size, sort);
  }

  public createFolder(name: string, parentNumber: number | null): Observable<AssetFolder> {
    return this.client.asset.folder.createFolder(name, parentNumber)
      .pipe(tap(() => this.notify('Creada', 'Carpeta creada')));
  }

  public updateFolder(folder: AssetFolder): Observable<AssetFolder> {
    return this.client.asset.folder.updateFolder(folder.number, folder.name, folder.parentNumber)
      .pipe(tap(() => this.notify('Actualizada', 'Carpeta actualizada')));
  }

  public deleteFolder(number: number): Observable<AssetFolder> {
    return this.client.asset.folder.deleteFolder(number)
      .pipe(tap(() => this.notify('Borrada', 'Carpeta borrada')));
  }

  public move(fileNumber: number, folderNumber: number | null): Observable<Asset> {
    const request = folderNumber === null ? this.client.asset.folder.moveToRoot(fileNumber, 'FILE')
      : this.client.asset.folder.moveToFolder(fileNumber, folderNumber, 'FILE');
    return request.pipe(tap(() => this.notify('Movido', 'Archivo movido')));
  }

  public get(number: number): Observable<Asset> {
    return this.client.asset.file.get(number);
  }

  public content(number: number): Observable<Blob> {
    return this.client.asset.file.content(number);
  }

  public contentUrl(number: number): string {
    return this.client.asset.file.contentUrl(number);
  }

  public create(metadata: Asset, content: File): Observable<Asset> {
    return this.client.asset.file.create(metadata.name, metadata.description, metadata.publicAccess, content)
      .pipe(tap(() => this.notify('Creado', 'Archivo creado')));
  }

  public update(metadata: Asset, content?: File): Observable<Asset> {
    let response: Observable<Asset>;

    if (content) {
      response = this.client.asset.file.update(metadata.number, metadata.name, metadata.description,
        metadata.publicAccess, content);
    } else {
      response = this.client.asset.file.patch(metadata.number, metadata.name, metadata.description, metadata.publicAccess);
    }
    response = response.pipe(tap(() => this.notify('Actualizado', 'Archivo actualizado')));

    return response;
  }

  public delete(number: number): Observable<Asset> {
    return this.client.asset.file.delete(number)
      .pipe(tap(() => this.notify('Borrado', 'Archivo borrado')));
  }

  private notify(summary: string, detail: string): void {
    this.messages.add({ severity: 'info', summary, detail, life: 3000 });
  }
}
