import React, { useState } from 'react';
import './Table.css';
import { PADDING, TablePropType, ColumnsType } from './Interface.ts';

export function Table<T extends { key: string }>(props: TablePropType<T>) {
  const [sortColumn, setSortColumn] = useState<ColumnsType<T> | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>(
    undefined,
  );
  const [sortData, setSortData] = useState([] as T[]);
  const [currentPage, setCurrentPage] = useState(1);

  const { columns, dataSource, useStickTop = false, pagination } = props;

  const getCurrentPageData = () => {
    const dataList = sortColumn ? sortData : dataSource;
    if (!pagination?.pageSize) {
      return dataList;
    }
    const start = (currentPage - 1) * pagination.pageSize;
    return dataList.slice(start, start + pagination.pageSize);
  };

  const onClickSort = (selectedColumn: ColumnsType<T>) => {
    if (!selectedColumn?.sorter) {
      return;
    }
    // 如果切换了列筛选
    if (sortColumn && sortColumn.key !== selectedColumn.key) {
      setSortOrder('asc');
      setSortColumn(selectedColumn);
      const newSortData = dataSource.slice().sort(selectedColumn.sorter);
      setSortData(newSortData);
      return;
    }
    setSortColumn(selectedColumn);
    if (sortOrder === 'asc') {
      setSortOrder('desc');
      const newSortData = dataSource
        .slice()
        .sort(selectedColumn.sorter)
        .reverse();
      setSortData(newSortData);
      return;
    }
    if (sortOrder === 'desc') {
      setSortColumn(null);
      setSortOrder(undefined);
      setSortData([]);
      return;
    }
    setSortOrder('asc');
    const newSortData = dataSource.slice().sort(selectedColumn.sorter);
    setSortData(newSortData);
  };

  const calculateFixedLeft = (
    fixed: undefined | 'left' | 'right',
    index: number,
  ) => {
    return fixed === 'left' && index !== 0
      ? columns.slice(0, index).reduce((acc, cur) => {
          return acc + (cur.width || 100);
        }, 0) +
          PADDING * 2 * index
      : undefined;
  };

  const calculateFixedRight = (
    fixed: undefined | 'left' | 'right',
    index: number,
  ) => {
    return fixed === 'right' && index !== 0
      ? columns.slice(index + 1, columns.length).reduce((acc, cur) => {
          return acc + (cur.width || 100);
        }, 0) +
          PADDING * 2 * (columns.length - index - 1)
      : undefined;
  };

  const calculateMaxFixedLeftShadow = () => {
    let maxIndex = -1;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i]?.fixed === 'left') {
        maxIndex = i;
      } else {
        break;
      }
    }
    if (maxIndex === -1) {
      return undefined;
    }
    return (
      (calculateFixedLeft(columns[maxIndex].fixed, maxIndex) || 0) +
      columns[maxIndex].width +
      PADDING * 2
    );
  };

  const calculateMaxFixedRightShadow = () => {
    let maxIndex = -1;
    for (let i = columns.length - 1; i > 0; i--) {
      if (columns[i]?.fixed === 'right') {
        maxIndex = i;
      } else {
        break;
      }
    }
    if (maxIndex === -1) {
      return undefined;
    }
    return (
      (calculateFixedRight(columns[maxIndex].fixed, maxIndex) || 0) +
      columns[maxIndex].width +
      PADDING * 2
    );
  };

  const handleScroll = (target: HTMLDivElement) => {
    const scrollLeft: number = target.scrollLeft;
    const tableHeaders: HTMLCollectionOf<Element> | undefined =
      target.parentElement?.getElementsByClassName('table-header-wrapper');
    if (tableHeaders && tableHeaders.length > 0) {
      tableHeaders[0].scrollLeft = scrollLeft;
    }
  };

  const renderThead = (columns: ColumnsType<T>[]) => {
    return (
      <thead>
        <tr>
          {columns.map((col, index) => {
            const { fixed } = col;
            const fixedClassName = fixed
              ? fixed === 'left'
                ? 'table-cell-fixed-left'
                : 'table-cell-fixed-right'
              : '';

            const left = calculateFixedLeft(fixed, index);
            const right = calculateFixedRight(fixed, index);
            const thClassName = `${fixedClassName} th`;

            return (
              <th
                className={thClassName}
                onClick={() => {
                  onClickSort(col);
                }}
                style={{ left, right, width: col.width }}
                key={col.key}
              >
                <div
                  className="th-cell"
                  style={{
                    width: col.width,
                  }}
                >
                  <div>{col.title}</div>
                  {col?.sorter && (
                    <div>
                      <div
                        className="arrow"
                        style={{
                          color:
                            sortColumn?.key === col.key && sortOrder === 'asc'
                              ? '#007bff'
                              : 'rgba(0, 0, 0, 0.29)',
                        }}
                      >
                        ▲
                      </div>
                      <div
                        className="arrow"
                        style={{
                          color:
                            sortColumn?.key === col.key && sortOrder === 'desc'
                              ? '#007bff'
                              : 'rgba(0, 0, 0, 0.29)',
                        }}
                      >
                        ▼
                      </div>
                    </div>
                  )}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };

  const renderBody = (columns: ColumnsType<T>[]) => {
    return (
      <tbody>
        {getCurrentPageData().map((data) => {
          return (
            <tr key={data.key}>
              {columns.map((col, index) => {
                const { fixed } = col;
                const fixedClassName = fixed
                  ? fixed === 'left'
                    ? 'table-cell-fixed-left'
                    : 'table-cell-fixed-right'
                  : '';
                const left = calculateFixedLeft(fixed, index);
                const right = calculateFixedRight(fixed, index);
                const tdClassName = `${fixedClassName} td`;
                return (
                  <td
                    className={tdClassName}
                    style={{ left, right, width: col.width }}
                    key={`${col.key}_${data.key}`}
                  >
                    <div style={{ width: col.width }}>
                      {data[col.dataIndex] as string}
                    </div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const renderPagination = () => {
    if (!pagination?.pageSize) {
      return null;
    }
    const totalPage = Math.ceil(dataSource.length / pagination.pageSize);
    return (
      <div className="pagination-wrapper">
        <div
          style={{ color: currentPage - 1 > 0 ? '#007bff' : '#e0e0e0' }}
          onClick={() => {
            if (currentPage - 1 > 0) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          {'<'}
        </div>
        <button className="button">{currentPage}</button>
        <div
          style={{
            color: currentPage + 1 <= totalPage ? '#007bff' : '#e0e0e0',
          }}
          onClick={() => {
            if (currentPage + 1 <= totalPage) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          {'>'}
        </div>
      </div>
    );
  };

  const renderFixedLeftConlumShadow = () => {
    const maxFixedLeft = calculateMaxFixedLeftShadow();
    if (!maxFixedLeft) {
      return null;
    }

    return (
      <div
        className="left-shadow"
        style={{
          left: maxFixedLeft,
        }}
      ></div>
    );
  };

  const renderFixedRightConlumShadow = () => {
    const maxFixedRight = calculateMaxFixedRightShadow();
    if (!maxFixedRight) {
      return null;
    }
    return (
      <div
        className="right-shadow"
        style={{
          right: maxFixedRight,
        }}
      ></div>
    );
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        {renderFixedLeftConlumShadow()}
        {renderFixedRightConlumShadow()}

        <div
          className="table-header-wrapper"
          style={{
            position: useStickTop ? 'sticky' : 'static',
          }}
        >
          <table className="table">{renderThead(columns)}</table>
        </div>

        <div
          className="table-body-wrapper"
          onScroll={(e) => handleScroll(e.currentTarget)}
        >
          <table className="table">{renderBody(columns)}</table>
        </div>
      </div>
      {renderPagination()}
    </div>
  );
}
