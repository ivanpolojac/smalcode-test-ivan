export interface IProject {
  id: number;
  name: string;
  owner: string;

  [key: string]: string | null | number;
}
