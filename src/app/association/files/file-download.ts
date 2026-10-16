export function downloadFile(content: Blob, filename: string): void {
  const url = URL.createObjectURL(content);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  link.hidden = true;
  document.body.appendChild(link);
  link.click();
  link.remove();

  // The browser may consume the blob URL asynchronously after click().
  // Revoking it immediately can cancel the download in Firefox and Safari.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
