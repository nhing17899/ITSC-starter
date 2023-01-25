import React, { useEffect, useMemo, useState } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';

import { format } from 'date-fns';
import { AssessmentService } from '../../services/AssessmentService';

import classes from './AssessmentList.module.css';

const GlobalFilter = ({ filter, setFilter }) =>
  <div className={classes.globalFilter}>
    Search: {` `}
    <input value={filter || ``}
      onChange={(e) => setFilter(e.target.value)}
    />
  </div>;

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js

  useEffect(() => {
    AssessmentService.getList().then(a => {
      setAssessments(a);
    });
  }, []);

  const columns = useMemo(
    () => [

      {
        Header: `Id`,
        accessor: `id`,
      },
      {
        Header: `Instrument Type`,
        accessor: `instrumentType`,
      },
      {
        Header: `Score`,
        accessor: `score`,
      },
      {
        Header: `Risk Level`,
        accessor: `riskLevel`,
      },
      {
        Header: `Cat Name`,
        accessor: `catName`,
      },
      {
        Header: `Cat Date Of Birth`,
        accessor: `catDateOfBirth`,
      },
      {
        Cell: ({ value }) => format(new Date(value), `yyyy-MM-dd`),
        Header: `Creation Date`,
        accessor: `createdAt`,
      },
    ],
    []
  );

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,

    setGlobalFilter,
    state,
  } = useTable({ columns, data: assessments },
    useGlobalFilter, useSortBy);

  const { globalFilter } = state;
  return (
    <div>
      <h1 className={classes.title}>Assessment List</h1>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()} style={{
        border: `solid 1px gray`,
        marginBottom: `7rem`,

        textAlign: `center`,
        width: `80rem`,
      }}>
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: `1px solid black`,
                    borderRight: `1px solid black`,
                    cursor: `pointer`,
                    margin: `0`,
                    padding: `0.5rem`,
                  }}>

                  {column.render(`Header`)}
                  <span>
                    {column.isSorted ?
                      column.isSortedDesc ?
                        ` 🔽` :
                        ` 🔼` :
                      ``}
                  </span>
                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  <td
                    {...cell.getCellProps()}
                    style={{
                      borderBottom: `1px solid black`,
                      borderRight: `1px solid black`,
                      margin: `0`,
                      padding: `0.5rem`,
                    }}
                  >
                    {cell.render(`Cell`)}
                  </td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
