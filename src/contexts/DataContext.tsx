import React, {createContext, FC, useContext, useEffect, useState,} from 'react';

import {IProject} from "./types";
import projectsData from "../data/projects.json";
import milestonesData from "../data/milestones.json";
import projectMilestoneData from "../data/projects_milestones.json";

interface IDataContext {
  projects: IProject[];
}

const initialState: IDataContext = {
  projects: [],
};
const DataContext = createContext<IDataContext>(initialState);

export const DataProvider: FC = ({children}: any) => {
  const [projects, setProjects] = useState(initialState.projects);

  const initialize = () => {
    let data: IProject[] = [];
    let initialMilestones = {}

    milestonesData.forEach(({name}) => {
      initialMilestones = {
        ...initialMilestones,
        [name]: null,
      };
    });

    data = projectsData.map((project) => ({
      ...project,
      ...initialMilestones,
    }));

    projectMilestoneData.forEach((row) => {
      const milestone = milestonesData.find(({id}) => id === row.milestone_id);

      data = data.map((project) => project.id === row.project_id ? ({
        ...project,
        ...(milestone !== undefined ? { [milestone.name]: row.completion_date } : {}),
      }) : project)
    })

    setProjects(data);
  };

  useEffect(() => {
    initialize();
  }, []);

  const value: IDataContext = {
    projects,
  };

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  );
};

export function useDataContext() {
  return useContext<IDataContext>(DataContext);
}
