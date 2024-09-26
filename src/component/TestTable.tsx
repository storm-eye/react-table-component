import React from 'react';
import { Table } from './Table.tsx';
import { ColumnsType } from './Interface.ts';

interface DataType {
  name: string;
  age: number;
  address: string;
  key: string;
}
const columns: ColumnsType<DataType>[] = [
  {
    title: 'Full Name',
    width: 150,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 8',
    dataIndex: 'address',
    key: '8',
    width: 150,
  },
  {
    title: 'Column 9',
    dataIndex: 'address',
    key: '9',
    width: 150,
  },
  {
    title: 'Column 10',
    dataIndex: 'address',
    key: '10',
    width: 150,
  },
  {
    title: 'Column 11',
    dataIndex: 'address',
    key: '11',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  {
    title: 'Column 12',
    dataIndex: 'address',
    key: '12',
    width: 150,
  },
  {
    title: 'Column 13',
    dataIndex: 'address',
    key: '13',
    width: 150,
    // fixed: "right",
  },
  {
    title: 'Column 14',
    dataIndex: 'address',
    key: '14',
    width: 100,
    fixed: 'right',
  },
];

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const dataSource = Array.from({ length: 30 }).map<DataType>((_, i) => ({
  key: String(i),
  name: `Edward ${i}`,
  age: getRandomInt(1, 100),
  address: `London Park no. ${i}`,
}));

const TestTable = () => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      useStickTop
      pagination={{ pageSize: 10 }}
    ></Table>
  );
};

export default TestTable;
