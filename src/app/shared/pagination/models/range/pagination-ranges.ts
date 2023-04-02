/**
 * Numeric arrays used to build the pagination component buttons.
 */
export class PaginationRanges {

    public left: number[] = [];

    public center: number[] = [];

    public right: number[] = [];

    private step = 2;

    constructor(page: number, pages: number) {
        if (pages > 0) {
            // Can't build info for empty pages

            // Left range
            // From 1 up to (step + 1)
            this.left = this.getLeftRange(pages);

            // Left range
            // From (current - step) up to (total pages - step)
            this.center = this.getCenterRange(page, pages);

            // Left range
            // From (total pages - step) up to total pages
            this.right = this.getRightRange(pages);

            // Merge ranges if needed
            this.merge();
        }
    }

    /**
     * Builds the left pages range.
     * 
     * @param pages total number of pages
     * @returns  the left pages range
     */
    private getLeftRange(pages: number): number[] {
        const range: number[] = [];

        const lower = 1;

        // Valid page with highest value
        let upper = this.step + 1;
        if (upper > pages) {
            upper = pages;
        }

        for (let i = lower; i <= upper; i++) {
            range.push(i);
        }

        return range;
    }

    /**
     * Builds the center pages range.
     * 
     * @param pages total number of pages
     * @returns  the center pages range
     */
    private getCenterRange(page: number, pages: number): number[] {
        const range: number[] = [];
        const lowerOffset = (this.step + 2);
        const upperOffset = (pages - this.step - 1);
        let lower;
        let upper;

        // Valid page with lowest value
        lower = page - this.step;
        if (lower < lowerOffset) {
            lower = lowerOffset;
        }

        // Valid page with highest value
        upper = page + this.step;
        if (upper > upperOffset) {
            upper = upperOffset;
        }

        for (let i = lower; i <= upper; i++) {
            range.push(i);
        }

        return range;
    }

    /**
     * Builds the right pages range.
     * 
     * @param pages total number of pages
     * @returns  the right pages range
     */
    private getRightRange(pages: number): number[] {
        const range: number[] = [];
        const offset = (this.step * 2);

        // Valid page with lowest value
        let lower = pages - this.step;
        if (lower < offset) {
            lower = offset;
        }

        const upper = pages;

        for (let i = lower; i <= upper; i++) {
            range.push(i);
        }

        return range;
    }

    /**
     * Merge the ranges. So if they overlap or continue each other, there will be no gaps in the component.
     */
    private merge() {
        let leftLimit;
        let rightLimit;

        // Merge center to right
        if (this.right.length > 0) {
            leftLimit = this.center[this.center.length - 1];
            rightLimit = this.right[0];

            if ((leftLimit + 1) >= rightLimit) {
                this.right = this.center.concat(this.right);
                this.center = [];
            }
        }

        // Merge left to center
        if (this.center.length > 0) {
            leftLimit = this.left[this.left.length - 1];
            rightLimit = this.center[0];

            if ((leftLimit + 1) >= rightLimit) {
                this.left = this.left.concat(this.center);
                this.center = [];
            }
        }

        // Merge left to right
        if (this.right.length > 0) {
            leftLimit = this.left[this.left.length - 1];
            rightLimit = this.right[0];

            if ((leftLimit + 1) >= rightLimit) {
                this.left = this.left.concat(this.right);
                this.right = [];
            }
        }
    }

}