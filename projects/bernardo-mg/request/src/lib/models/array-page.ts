import { Page } from "./page";

/**
 * Creates a page from an array.
 */
export function arrayPage<T>(content: T[], page: number, size: number): Page<T> {
  let totalPages;

  if (size === 0) {
    totalPages = 0;
  } else {
    totalPages = Math.ceil(content.length / size);
  }

  const slicedContent = content.slice(size * (page - 1), size * page);
  return {
    content: slicedContent,
    size,
    page,
    totalPages,
    totalElements: content.length,
    elementsInPage: slicedContent.length,
    first: (page <= 1),
    last: (page >= totalPages)
  };
}
