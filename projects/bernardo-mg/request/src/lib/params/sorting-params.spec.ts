import { SortDirection } from "../models/sort-direction";
import { SortProperty } from "../models/sort-field";
import { SortingParams } from "./sorting-params";

describe("SortingParams", () => {

  /** PROPERTY LISTS */

  it('should return sorting properties when they are the only ones set', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name')
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortProperty('name')
      ]
    );
  });

  it('should use default sort when the property is missing from the properties list', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name')
      ],
      [
        new SortProperty('age')
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortProperty('name', SortDirection.Ascending),
        new SortProperty('age', SortDirection.Ascending)
      ]
    );
  });

  it('should return an empty list when no property is received', () => {
    const sortingParams = new SortingParams([]);

    expect(sortingParams.getFinalProperties()).toEqual([]);
  });

  /** ERROR CORRECTION */

  it('shouldn\'t return duplicated properties', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name'),
        new SortProperty('name')
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortProperty('name')
      ]
    );
  });

  it('should remove unsorted properties', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name', SortDirection.Unsorted)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual([]);
  });

  /** OVERRIDE SORTINGS */

  it('should override default sort when the property is received', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('name'),
        new SortProperty('age', SortDirection.Descending)
      ],
      [
        new SortProperty('age', SortDirection.Ascending)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortProperty('name', SortDirection.Ascending),
        new SortProperty('age', SortDirection.Descending)
      ]
    );
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

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortProperty('name', SortDirection.Ascending),
        new SortProperty('age', SortDirection.Ascending)
      ]
    );
  });

  /** ORDERING */

  it('should not change properties order', () => {
    const sortingParams = new SortingParams(
      [
        new SortProperty('zname', SortDirection.Ascending),
        new SortProperty('aname', SortDirection.Descending)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortProperty('zname', SortDirection.Ascending),
        new SortProperty('aname', SortDirection.Descending)
      ]
    );
  });

});
