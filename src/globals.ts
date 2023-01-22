export function createObjectURL(object: Blob) {
  return window.URL.createObjectURL(object)
}

export function revokeObjectURL(url: string): void {
  window.URL.revokeObjectURL(url)
}

export function Blob(blobParts?: BlobPart[], options?: BlobPropertyBag): Blob {
  return new window.Blob(blobParts, options)
}
