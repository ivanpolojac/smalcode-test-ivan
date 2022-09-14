import React from "react";
import {Box, Typography} from "@material-ui/core";

import { ProjectTable } from "./components/ProjectTable";

import { useStyles } from "./styles";

const HomePage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography variant="h2" className={classes.title}>
        Project management
      </Typography>
      <ProjectTable />
    </Box>
  );
};

export default HomePage;
