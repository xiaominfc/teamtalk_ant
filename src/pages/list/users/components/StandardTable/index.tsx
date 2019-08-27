import { Table } from 'antd';
import { ColumnProps, TableRowSelection, TableProps } from 'antd/es/table';
import React, { Component } from 'react';
import styles from './index.less';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface StandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: StandardTableColumnProps<T>[];
  data: {
    list: T[];
    pagination: StandardTableProps<T>['pagination'];
  };
  selectedRows: T[];
  onSelectRow: (rows: any) => void;
}

export interface StandardTableColumnProps<T> extends ColumnProps<T> {
  needTotal?: boolean;
  total?: number;
}


interface StandardTableState<T> {
  selectedRowKeys: string[];
  needTotalList: StandardTableColumnProps<T>[];
}

class StandardTable<T> extends Component<StandardTableProps<T>, StandardTableState<T>> {
  constructor(props: StandardTableProps<T>) {
    super(props);
    const { columns } = props;
    const needTotalList = this.initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  initTotalList = (columns: StandardTableColumnProps<T>[]) => {
    if (!columns) {
      return [];
    }
    const totalList: StandardTableColumnProps<T>[] = [];
    columns.forEach(column => {
      if (column.needTotal) {
        totalList.push({ ...column, total: 0 });
      }
    });
    return totalList;
  };

  handleRowSelectChange: TableRowSelection<T>['onChange'] = (
    selectedRowKeys,
    selectedRows: T[],
  ) => {
    const currySelectedRowKeys = selectedRowKeys as string[];
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex || 0]), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys: currySelectedRowKeys, needTotalList });
  };

  handleTableChange: TableProps<T>['onChange'] = (
    pagination,
    filters,
    sorter,
    ...rest
  ) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  };

  cleanSelectedKeys = () => {
    if (this.handleRowSelectChange) {
      this.handleRowSelectChange([], []);
    }
  };


  render() {
    const { selectedRowKeys } = this.state;
    const { data, rowKey, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};

    const paginationProps = pagination
      ? {
          showSizeChanger: true,
          showQuickJumper: true,
          ...pagination,
        }
      : false;

    const rowSelection: TableRowSelection<T> = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record: T) => ({
        // disabled: record.status != "0",
        disabled: false,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'id'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        >
          </Table>
      </div>
    );
  }
}

export default StandardTable;
