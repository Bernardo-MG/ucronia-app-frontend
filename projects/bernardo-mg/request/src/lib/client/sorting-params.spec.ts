import { SortDirection } from "../models/sort-direction";
import { SortProperty } from "../models/sort-field";
import { SortingParams } from "./sorting-params";

describe("SortingParams", () => {

  it('should return default sort when no custom sort is set', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name')
      ]);

    expect(sortingParams.getFinalProperties()).toEqual([
      new SortProperty('name')
    ]);
  });

  it('should override default sort', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name'),
        new SortProperty('age', SortDirection.Descending)
      ],
      [
        new SortProperty('age', SortDirection.Ascending)
      ]);

    expect(sortingParams.getFinalProperties()).toEqual([
      new SortProperty('name', SortDirection.Ascending),
      new SortProperty('age', SortDirection.Descending)
    ]);
  });

  it('should use default sort when missing', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name')
      ],
      [
        new SortProperty('age', SortDirection.Ascending)
      ]);

    expect(sortingParams.getFinalProperties()).toEqual([
      new SortProperty('name', SortDirection.Ascending),
      new SortProperty('age', SortDirection.Ascending)
    ]);
  });

  it('should use default sort when unsorted', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name'),
        new SortProperty('age', SortDirection.Unsorted)
      ],
      [
        new SortProperty('age', SortDirection.Ascending)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual([
      new SortProperty('name', SortDirection.Ascending),
      new SortProperty('age', SortDirection.Ascending)
    ]);
  });

  it('should not sort properties', () => {
    const sortingParams = new SortingParams([
      new SortProperty('zname', SortDirection.Ascending),
      new SortProperty('aname', SortDirection.Descending)
    ]);

    expect(sortingParams.getFinalProperties()).toEqual([
      new SortProperty('zname', SortDirection.Ascending),
      new SortProperty('aname', SortDirection.Descending)
    ]);
  });

  it('should not short when no property is received', () => {
    const sortingParams = new SortingParams([]);

    expect(sortingParams.getFinalProperties()).toEqual([]);
  });

  it('should remove duplicated properties', () => {
    const sortingParams = new SortingParams([
      new SortProperty('name'),
      new SortProperty('name')
    ]);

    expect(sortingParams.getFinalProperties()).toEqual([
      new SortProperty('name')
    ]);
  });

  it('should remove unsorted properties', () => {
    const sortingParams = new SortingParams([
      new SortProperty('name', SortDirection.Unsorted)
    ]);

    expect(sortingParams.getFinalProperties()).toEqual([]);
  });

});
