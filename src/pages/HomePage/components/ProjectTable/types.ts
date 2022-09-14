export interface TableHeadProps {
  classes: object;
  order: 'asc' | 'desc';
  orderBy: string;
  onRequestSort(event: MouseEvent, property: string): void;
}