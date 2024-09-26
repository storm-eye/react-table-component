export const PADDING = 20;

export interface ColumnsType<T> {
  title: string;
  dataIndex: keyof T; // 用于关联数据源中对应的字段
  key: string;
  width: number;
  sorter?: (a: T, b: T) => number;
  fixed?: 'right' | 'left';
}

export interface TablePropType<T extends { key: string }> {
  columns: ColumnsType<T>[];
  dataSource: T[];
  useStickTop?: boolean;
  pagination?: {
    pageSize: number;
  };
}

export interface WithKey {
  key: string;
}
