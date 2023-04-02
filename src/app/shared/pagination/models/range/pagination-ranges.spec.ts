import { TestBed } from '@angular/core/testing';
import { PaginationRanges } from './pagination-ranges';

describe('PaginationRanges', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    // Minimal values

    it('should create no data for an empty pagination', () => {
        const ranges = new PaginationRanges(0, 0);

        expect(ranges.left).withContext('Left range should be empty').toEqual([]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should be empty').toEqual([]);
    });

    it('should create only the left range for the minimal pagination', () => {
        const ranges = new PaginationRanges(1, 1);

        expect(ranges.left).withContext('Left range should contain the first page').toEqual([1]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should be empty').toEqual([]);
    });

    // Extremes

    it('should create both extremes when pointing to the first page', () => {
        const ranges = new PaginationRanges(1, 10);

        expect(ranges.left).withContext('Left range should contain the first pages').toEqual([1, 2, 3]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should contain the last pages').toEqual([8, 9, 10]);
    });

    it('should create both extremes when pointing to the last page', () => {
        const ranges = new PaginationRanges(10, 10);

        expect(ranges.left).withContext('Left range should contain the first pages').toEqual([1, 2, 3]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should contain the last pages').toEqual([8, 9, 10]);
    });

    // Center range

    it('should create all ranges when pointing to the middle page', () => {
        const ranges = new PaginationRanges(10, 20);

        expect(ranges.left).withContext('Left range should contain the first pages').toEqual([1, 2, 3]);
        expect(ranges.center).withContext('Center range should contain the middle pages').toEqual([8, 9, 10, 11, 12]);
        expect(ranges.right).withContext('Right range should contain the last pages').toEqual([18, 19, 20]);
    });

    it('should create all ranges when pointing before the middle page', () => {
        const ranges = new PaginationRanges(9, 20);

        expect(ranges.left).withContext('Left range should contain the first pages').toEqual([1, 2, 3]);
        expect(ranges.center).withContext('Center range should contain the middle pages').toEqual([7, 8, 9, 10, 11]);
        expect(ranges.right).withContext('Right range should contain the last pages').toEqual([18, 19, 20]);
    });

    it('should create all ranges when pointing after the middle page', () => {
        const ranges = new PaginationRanges(11, 20);

        expect(ranges.left).withContext('Left range should contain the first pages').toEqual([1, 2, 3]);
        expect(ranges.center).withContext('Center range should contain the middle pages').toEqual([9, 10, 11, 12, 13]);
        expect(ranges.right).withContext('Right range should contain the last pages').toEqual([18, 19, 20]);
    });

    // Merging ranges

    it('should create a single range when pointing to the middle page and all the ranges overlap', () => {
        const ranges = new PaginationRanges(5, 10);

        expect(ranges.left).withContext('Left range should contain the full range').toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should be empty').toEqual([]);
    });

    it('should create a single range when the extremes overlap', () => {
        const ranges = new PaginationRanges(1, 6);

        expect(ranges.left).withContext('Left range should contain the full range').toEqual([1, 2, 3, 4, 5, 6]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should be empty').toEqual([]);
    });

    it('should merge left and center when they overlap', () => {
        const ranges = new PaginationRanges(6, 20);

        expect(ranges.left).withContext('Left range should contain the merged range').toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should contain the last pages').toEqual([18, 19, 20]);
    });

    it('should merge center and right when they overlap', () => {
        const ranges = new PaginationRanges(15, 20);

        expect(ranges.left).withContext('Left range should contain the first pages').toEqual([1, 2, 3]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should contain the merged range').toEqual([13, 14, 15, 16, 17, 18, 19, 20]);
    });

    // Moving around extremes

    it('should extend the left range when pointing to the second page', () => {
        const ranges = new PaginationRanges(2, 10);

        expect(ranges.left).withContext('Left range should contain the additional pages').toEqual([1, 2, 3, 4]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should contain the last pages').toEqual([8, 9, 10]);
    });

    it('should extend the left range when pointing to the third page', () => {
        const ranges = new PaginationRanges(3, 10);

        expect(ranges.left).withContext('Left range should contain the additional pages').toEqual([1, 2, 3, 4, 5]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should contain the last pages').toEqual([8, 9, 10]);
    });

    it('should extend the right range when pointing to the n-1 page', () => {
        const ranges = new PaginationRanges(9, 10);

        expect(ranges.left).withContext('Left range should contain the first pages').toEqual([1, 2, 3]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should contain the additional pages').toEqual([7, 8, 9, 10]);
    });

    it('should extend the right range when pointing to the n-2 page', () => {
        const ranges = new PaginationRanges(8, 10);

        expect(ranges.left).withContext('Left range should contain the first pages').toEqual([1, 2, 3]);
        expect(ranges.center).withContext('Center range should be empty').toEqual([]);
        expect(ranges.right).withContext('Right range should contain the additional pages').toEqual([6, 7, 8, 9, 10]);
    });

});