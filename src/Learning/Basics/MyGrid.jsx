import styles from './MyGrid.module.css';

export const initialColumns = [
  {id: 'firstName', label: 'First Name'},
  {id: 'lastName', label: 'Last Name'},
  {id: 'age', label: 'Age'},
];

export const initialRows = [
  {id: 1, firstName: 'bob', lastName: 'foo', age: 25},
  {id: 2, firstName: 'jane', lastName: 'bar', age: 30},
];

export const MyGrid = ({columns = [], rows = []}) => {
  const columnElements = (
    <tr>
      {
        columns.map(column => <th key={column.id} className={styles.tableCell}>
          {column.label}
        </th>)
      }
    </tr>
  );

  const createRowElement = row => (
    <tr key={row.id}>
      {
        columns.map(column => (
          <td key={column.id} className={styles.tableCell}>
            {row[column.id]}
          </td>
        ))
      }
    </tr>
  );

  const rowElements = (
    <>
      {
        rows.map(row => createRowElement(row))
      }
    </>
  );

  return (
    <table className={`${styles.tableContainer}`}>
      <thead>
        {columnElements}
      </thead>
      <tbody>
        {rowElements}
      </tbody>
    </table>
  );
}