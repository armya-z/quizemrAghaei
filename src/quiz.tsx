import React from "react"
import { FC, useCallback, useMemo } from "react"

export interface User {
  id: number
}

interface OrdinaryUser extends User {
  name: string
  age: number
}

interface Employee extends User {
  fullName: string
  position: string
}

interface DataTableProps<T extends User> {
  data: T[]
  columns: {
    Header: string
    accessor: keyof T
  }[]
}

//Table Conponent With General Input
const DataTable: FC<DataTableProps<User>> = ({ data, columns }) => {

  const renderRows = useCallback(() => {
    return data?.map((row) => <tr key={row?.id}>{columns?.map((col) => <td key={col.accessor}>{row[col.accessor]}</td>)}</tr>)
  }, [data, columns])

  const memoizedRenderRows = useMemo(() => renderRows, [renderRows])

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor}>{col.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{memoizedRenderRows()}</tbody>
    </table>
  )
}

//Input Data
const ordinaryUserData = {
  ordinaryUsers: [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Alice Smith", age: 30 },
    { id: 3, name: "Bob Johnson", age: 28 },
  ],
}

const ordinaryUserColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Name", accessor: "name" },
  { Header: "Age", accessor: "age" },
]

const OrdinaryUsersTable: FC = () => <DataTable<OrdinaryUser> data={ordinaryUserData.ordinaryUsers} columns={ordinaryUserColumns} />

const employeeData = {
  employees: [
    { id: 101, fullName: "Jane Doe", position: "Software Engineer" },
    { id: 102, fullName: "Charlie Brown", position: "Product Manager" },
    { id: 103, fullName: "Eva Williams", position: "UI/UX Designer" },
  ],
}

const employeeColumns = [
  { Header: "ID", accessor: "id" },
  { Header: "Full Name", accessor: "fullName" },
  { Header: "Position", accessor: "position" },
]

const EmployeesTable: FC = () => <DataTable<Employee> data={employeeData.employees} columns={employeeColumns} />

// Example usage
const Quize: FC = () => (
  <div>
    <h2>Ordinary Users Table</h2>
    <OrdinaryUsersTable />

    <h2>Employees Table</h2>
    <EmployeesTable />
  </div>
)

export default Quize
