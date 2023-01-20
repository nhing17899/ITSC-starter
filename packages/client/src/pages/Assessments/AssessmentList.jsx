import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';

import { AssessmentService } from '../../services/AssessmentService';

import classes from './AssessmentList.module.css';

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
    ],
    []
  );

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({ columns, data: assessments });

  return (
    <div>
      <h1 className={classes.title}>Assessment List</h1>
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
                <th
                  {...column.getHeaderProps()}

                  style={{
                    borderBottom: `1px solid black`,
                    borderRight: `1px solid black`,
                    margin: `0`,
                    padding: `0.5rem`,
                  }}
                >
                  {column.render(`Header`)}
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
