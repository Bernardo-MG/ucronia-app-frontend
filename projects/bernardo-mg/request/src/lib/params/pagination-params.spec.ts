import { PaginationParams } from "./pagination-params";

describe("PaginationParams", () => {

  it("should set page parameter when page is provided", () => {
    const paginationParams = new PaginationParams(1);
    
    const params: Record<string, any> = {};
    paginationParams.load((name, value) => {
      params[name] = value;
    });
    
    expect(params["page"]).toBe(1);
  });

  it("should set size parameter when size is provided", () => {
    const paginationParams = new PaginationParams(undefined, 20);
    
    const params: Record<string, any> = {};
    paginationParams.load((name, value) => {
      params[name] = value;
    });
    
    expect(params["size"]).toBe(20);
  });

  it("should set both page and size parameters when both are provided", () => {
    const paginationParams = new PaginationParams(1, 20);
    
    const params: Record<string, any> = {};
    paginationParams.load((name, value) => {
      params[name] = value;
    });
    
    expect(params["page"]).toBe(1);
    expect(params["size"]).toBe(20);
  });

  it("should not set parameters when neither page nor size are provided", () => {
    const paginationParams = new PaginationParams();
    
    const params: Record<string, any> = {};
    paginationParams.load((name, value) => {
      params[name] = value;
    });
    
    expect(params).toEqual({});
  });
});
