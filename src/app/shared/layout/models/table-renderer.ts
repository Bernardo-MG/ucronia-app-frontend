
export interface TableRenderer {
  name: string;
  render: (cell: any) => string;
}