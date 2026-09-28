import { fakeAsync, tick } from '@angular/core/testing';
import { downloadFile } from './file-download';

describe('downloadFile', () => {
  it('should click a temporary link and defer revoking the blob URL', fakeAsync(() => {
    const content = new Blob(['document'], { type: 'application/pdf' });
    const link = document.createElement('a');
    spyOn(document, 'createElement').and.returnValue(link);
    spyOn(link, 'click');
    spyOn(link, 'remove');
    spyOn(URL, 'createObjectURL').and.returnValue('blob:file');
    spyOn(URL, 'revokeObjectURL');

    downloadFile(content, 'document.pdf');

    expect(URL.createObjectURL).toHaveBeenCalledWith(content);
    expect(link.href).toContain('blob:file');
    expect(link.download).toBe('document.pdf');
    expect(link.click).toHaveBeenCalled();
    expect(link.remove).toHaveBeenCalled();
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();

    tick(1000);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:file');
  }));
});
