
export class PaginationCalculator {

  private rangeSize = 2;

  public calculate(info: PaginationCalculatorInfo): PaginationCalculatorStatus {
    var start: number;
    var end: number;
    const totalp = info.totalPages - 1;
    const result: PaginationCalculatorStatus = { pages: [], skipBefore: false, skipAfter: false };

    if ((info.currentPage + 1) <= this.rangeSize) {
      // Current page in the lower page window
      start = 0;
      end = this.rangeSize * 2;
      if (end > totalp) {
        end = totalp;
      }
    } else if (info.currentPage + this.rangeSize > totalp) {
      // Current page in the upper page window
      start = totalp - (this.rangeSize * 2);
      if (start < 0) {
        start = 0;
      }
      end = totalp;
    } else {
      start = info.currentPage - this.rangeSize;
      end = info.currentPage + this.rangeSize;
    }

    result.skipBefore = start > 0;
    result.skipAfter = end < totalp;

    result.pages = [];
    for (var i = start; i <= end; i++) {
      result.pages.push(i);
    }

    return result;
  }

}

interface PaginationCalculatorInfo {
  currentPage: number;
  totalPages: number;
}

interface PaginationCalculatorStatus {
  pages: number[];
  skipBefore: boolean;
  skipAfter: boolean;
}
