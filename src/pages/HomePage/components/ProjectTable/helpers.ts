import { IProject } from "../../../../contexts/types";
import milestones from "../../../../data/milestones.json";

export const descendingComparator = (a: IProject, b: IProject, orderBy: string) => {
  // @ts-ignore
  if (a[orderBy] === null || b[orderBy] < a[orderBy]) {
    return -1;
  }
  // @ts-ignore
  if (b[orderBy] === null || b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getComparator = (order: 'desc' | 'asc', orderBy: string) => {
  return order === 'desc'
    ? (a: IProject, b: IProject) => descendingComparator(a, b, orderBy)
    : (a: IProject, b: IProject) => -descendingComparator(a, b, orderBy);
}

export const stableSort = (array: IProject[], comparator: Function): IProject[] => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    // @ts-ignore
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]) as IProject[];
}

export const headCells = [
  { id: 'name', label: 'Project name' },
  { id: 'owner', label: 'Project Owner' },
  ...(milestones.map((milestone) => ({
    id: milestone.name,
    label: milestone.name,
  }))),
];
