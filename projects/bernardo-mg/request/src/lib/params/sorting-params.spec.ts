import { SortingDirection } from "../models/sorting-direction";
import { SortingProperty } from "../models/sorting-property";
import { SortingParams } from "./sorting-params";

describe("SortingParams", () => {

  /** LOAD METHOD */

  it('should load parameters correctly', () => {
    const sortingParams = new SortingParams([
      new SortingProperty('name', SortingDirection.Ascending),
      new SortingProperty('age', SortingDirection.Descending)
    ]);

    const params: Record<string, string[]> = {};
    sortingParams.load((name, value) => {
      if (!params[name]) {
        params[name] = [];
      }
      params[name].push(value);
    });

    expect(params["sort"]).toEqual(["name,asc", "age,desc"]);
  });

  /** PROPERTY LISTS */

  it('should return sorting properties when they are the only ones set', () => {
    const sortingParams = new SortingParams(
      [
        new SortingProperty('name')
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortingProperty('name')
      ]
    );
  });

  it('should use default sort when the property is missing from the properties list', () => {
    const sortingParams = new SortingParams(
      [
        new SortingProperty('name')
      ],
      [
        new SortingProperty('age')
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortingProperty('name', SortingDirection.Ascending),
        new SortingProperty('age', SortingDirection.Ascending)
      ]
    );
  });

  it('should use default sort when no property is received', () => {
    const sortingParams = new SortingParams(
      [],
      [
        new SortingProperty('age')
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortingProperty('age', SortingDirection.Ascending)
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
        new SortingProperty('name'),
        new SortingProperty('name')
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortingProperty('name')
      ]
    );
  });

  it('should remove unsorted properties', () => {
    const sortingParams = new SortingParams(
      [
        new SortingProperty('name', SortingDirection.Unsorted)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual([]);
  });

  /** OVERRIDE SORTINGS */

  it('should override default sort when the property is received', () => {
    const sortingParams = new SortingParams(
      [
        new SortingProperty('name'),
        new SortingProperty('age', SortingDirection.Descending)
      ],
      [
        new SortingProperty('age', SortingDirection.Ascending)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortingProperty('name', SortingDirection.Ascending),
        new SortingProperty('age', SortingDirection.Descending)
      ]
    );
  });

  it('should use default sort when unsorted', () => {
    const sortingParams = new SortingParams(
      [
        new SortingProperty('name'),
        new SortingProperty('age', SortingDirection.Unsorted)
      ],
      [
        new SortingProperty('age', SortingDirection.Ascending)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortingProperty('name', SortingDirection.Ascending),
        new SortingProperty('age', SortingDirection.Ascending)
      ]
    );
  });

  /** ORDERING */

  it('should not change properties order', () => {
    const sortingParams = new SortingParams(
      [
        new SortingProperty('zname', SortingDirection.Ascending),
        new SortingProperty('aname', SortingDirection.Descending)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortingProperty('zname', SortingDirection.Ascending),
        new SortingProperty('aname', SortingDirection.Descending)
      ]
    );
  });

  it('should not change default properties order', () => {
    const sortingParams = new SortingParams(
      [],
      [
        new SortingProperty('zname', SortingDirection.Ascending),
        new SortingProperty('aname', SortingDirection.Descending)
      ]
    );

    expect(sortingParams.getFinalProperties()).toEqual(
      [
        new SortingProperty('zname', SortingDirection.Ascending),
        new SortingProperty('aname', SortingDirection.Descending)
      ]
    );
  });

});
