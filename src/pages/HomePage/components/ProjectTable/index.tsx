import React, {useMemo} from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import moment from "moment";

import {TableHead} from "./TableHead";

import {getComparator, stableSort} from "./helpers";
import {useStyles} from "./styles";
import {useDataContext} from "../../../../contexts/DataContext";

export const ProjectTable = () => {
  const classes = useStyles();

  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const { projects } = useDataContext();

  const rows = useMemo(() => {
    return stableSort(projects, getComparator(order, orderBy));
  }, [order, orderBy, projects]);

  const handleRequestSort = (event: MouseEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box flex={1} pt={3}>
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <TableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {rows.map(({ id, name, owner, ...rest }) => (
              <TableRow
                hover
                tabIndex={-1}
                key={id}
              >
                <TableCell component="th" id={`${id}`} scope="row">
                  <Box display="flex" alignItems="center">
                    {name}
                  </Box>
                </TableCell>
                <TableCell>{owner}</TableCell>
                {Object.keys(rest).map((key, index) => (
                  <TableCell key={`milestone-${index}`}>
                    {rest[key] === null ? '—' : moment(rest[key]).format('D.M.YYYY')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
