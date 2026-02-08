import { arrayPage } from "./array-page";

describe('arrayPage', () => {

  it('should set the content when loading the initial page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 1, 2);

    expect(response.content).toEqual(['a', 'b']);
  });

  it('should set the content when loading the middle page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 2, 2);

    expect(response.content).toEqual(['c', 'd']);
  });

  it('should set the content when loading the last page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 3, 2);

    expect(response.content).toEqual(['e']);
  });

  it('should set the page data when loading the initial page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 1, 2);

    expect(response.page).toEqual(1);
    expect(response.size).toEqual(2);
    expect(response.totalPages).toEqual(3);
    expect(response.totalElements).toEqual(5);
    expect(response.elementsInPage).toEqual(2);
  });

  it('should set the page data when loading the middle page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 2, 2);

    expect(response.page).toEqual(2);
    expect(response.size).toEqual(2);
    expect(response.totalPages).toEqual(3);
    expect(response.totalElements).toEqual(5);
    expect(response.elementsInPage).toEqual(2);
  });

  it('should set the page data when loading the last page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 3, 2);

    expect(response.page).toEqual(3);
    expect(response.size).toEqual(2);
    expect(response.totalPages).toEqual(3);
    expect(response.totalElements).toEqual(5);
    expect(response.elementsInPage).toEqual(1);
  });

  it('should mark the response as the first when loading the initial page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 1, 2);

    expect(response.first).toEqual(true);
    expect(response.last).toEqual(false);
  });

  it('should not mark the response as the first or last when loading the middle page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 2, 2);

    expect(response.first).toEqual(false);
    expect(response.last).toEqual(false);
  });

  it('should mark the response as the last when loading the last page', () => {
    const data = ['a', 'b', 'c', 'd', 'e'];
    const response = arrayPage<string>(data, 3, 2);

    expect(response.first).toEqual(false);
    expect(response.last).toEqual(true);
  });

  // Empty data

  it('should set the content when loading empty data', () => {
    const data: string[] = [];
    const response = arrayPage<string>(data, 1, 0);

    expect(response.content).toEqual([]);
  });

  it('should set the page data when loading empty data', () => {
    const data: string[] = [];
    const response = arrayPage<string>(data, 1, 0);

    expect(response.page).toEqual(1);
    expect(response.size).toEqual(0);
    expect(response.totalPages).toEqual(0);
    expect(response.totalElements).toEqual(0);
    expect(response.elementsInPage).toEqual(0);
  });

  it('should mark the response as the first and last when loading empty data', () => {
    const data: string[] = [];
    const response = arrayPage<string>(data, 1, 0);

    expect(response.first).toEqual(true);
    expect(response.last).toEqual(true);
  });


});
