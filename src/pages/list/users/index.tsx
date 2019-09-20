import {
  Badge,
  Button,
  Card,
  Divider,
  Dropdown,
  Form,
  Icon,
  Menu,
  message,
  Avatar,
} from 'antd';
import React, { Component, Fragment } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { SorterResult } from 'antd/es/table';
import { connect } from 'dva';
import moment from 'moment';
import { StateType } from './model';
import AddOrUpdateForm from './components/AddOrUpdateForm';
import StandardTable, { StandardTableColumnProps } from './components/StandardTable';
import { UserItemInf, TableListPagination, TableListParams, BaseItemInf, UserData, AnswerResult,PageTableListData } from './data.d';
import styles from './style.less';

const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

type IStatusMapType = 'success' | 'error';
const statusMap = ['success', 'error'];
const status = ['正常', '异常'];
const statusTexts = status.map((value, index) => ({ text: value, value: `${index}` }));

export interface TableListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
}

export interface TableListState<T extends BaseItemInf> {
  modalVisible: boolean;
  updateModalVisible: boolean;
  selectedRows: T[];
  record: {};
}


export interface DataInf<T> extends TableListProps{
  list:StateType<T>;
}


export abstract class BaseTableList<T extends BaseItemInf, D extends PageTableListData> extends Component<DataInf<D>> {
  workNameSpace:string = '';

  statusColumn:StandardTableColumnProps<T> = {
    title: '状态',
    dataIndex: 'status',
    filters: statusTexts,
    render(val: IStatusMapType) {
      return <Badge status={statusMap[val]} text={status[val]} />;
    },
  }

  updatedColumn:StandardTableColumnProps<T> = {
    title: '更新时间',
      dataIndex: 'updated',
      render: (val: string) => <span>{moment(new Date(parseInt(val) * 1000)).format('YYYY-MM-DD HH:mm:ss')}</span>,
  }

  controlColumn:StandardTableColumnProps<T> = {
    title: '操作',
    render: (text, record) => (
      <Fragment>
        <a onClick={() => {
          this.editOrAddRecord(record)
        }}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => {
          this.removeRecord(record);
        }}>移除</a>
      </Fragment>
    ),
  }

  state: TableListState<T> = {
    modalVisible: false,
    updateModalVisible: false,
    selectedRows: [],
    record: {},
  };

  columns: StandardTableColumnProps<T>[] = [];

  handleMenuClick = (e: { key: string }) => {
		const { dispatch } = this.props;
		const { selectedRows } = this.state;

		if (!selectedRows) return;
		switch (e.key) {
		  case 'remove':
			dispatch({
			  type: `${this.workNameSpace}/${e.key}`,
			  payload: {
				id: selectedRows.map(row => row.id),
			  },
			  callback: () => {
				this.setState({
				  selectedRows: [],
				});
			  },
			});
			break;
		  default:
			break;
		}
  };

  currentPagination = ():Partial<TableListPagination> => {
    const data = this.getListData();
    return data.pagination || {};
  }

  reloadCurrent=() => {
    const pagination = this.currentPagination();
    const { dispatch } = this.props;
    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: `${this.workNameSpace}/fetch`,
      payload: params,
    });
  }

  getListData=():Partial<D> => {
    const {
      list: { data },
    } = this.props;
    return data || {};
  }


  handleAddOrUpdate = (fields:T) => {
    const { dispatch } = this.props;
    const pagination = this.currentPagination();
    
    if (fields.id == null) {
      dispatch({
        type: `${this.workNameSpace}/add`,
        payload: {
          record: fields,
        },
        callback: (response:AnswerResult) => {
          if (response.status == 'ok') {
            message.success('添加成功');
            if (pagination && (pagination.current || 0) >= Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))) {
              this.reloadCurrent();
            }
          } else {
            message.warn(response.msg);
          }
        },
      });
    } else {
      dispatch({
        type: `${this.workNameSpace}/update`,
        payload: {
          record: fields,
        },
        callback: (response:AnswerResult) => {
          if (response.status == 'ok') {
            message.success('修改成功');
            this.reloadCurrent();
          } else {
            message.warn(response.msg);
          }
        },
      });
    }
    this.handleModalVisible();
  };


  editOrAddRecord = (record?:T) => {
    this.setState({ record: record || {} });
    this.handleModalVisible(true);
  }

  removeRecord = (record:T) => {
    const { dispatch } = this.props;
            dispatch({
              type: `${this.workNameSpace}/remove`,
              payload: {
                id: record.id,
              },
              callback: (response:AnswerResult) => {
                if(response.status ==  'failed') {
                  message.warn(response.msg);
                }else {
                  this.setState({

                  });
                  this.reloadCurrent();
                }
              },
    });
  }

  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${this.workNameSpace}/fetch`,
    });
  }

  handleStandardTableChange = (
    pagination: Partial<TableListPagination>,
    filtersArg: Record<keyof T, string[]>,
    sorter: SorterResult<T>,
  ) => {
    const { dispatch } = this.props;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableListParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: `${this.workNameSpace}/fetch`,
      payload: params,
    });
  };


  handleSelectRows = (rows:[]) => {
    this.setState({
      selectedRows: rows,
    });
  };


  createForm = () => (<div></div>)

  formatTableData = ():{list:T[], pagination:{}} => ({ list: [], pagination: {} })

  render() {
    const {
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
      </Menu>
    );
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator} >
              <Button icon="plus" type="primary" onClick={() => {
                this.editOrAddRecord();
              }}>
                新建
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable<T>
              selectedRows={selectedRows}
              loading={loading}
              data={this.formatTableData()}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        {this.createForm()}
      </PageHeaderWrapper>
    );
  }
}


const UserListNameSpace = 'listUsers';

@connect(
  (result:{}) => {
    return ({
    list: result[UserListNameSpace],
    loading: result['loading'].models[UserListNameSpace],
  });
  },
)
class UsersTableList extends BaseTableList<UserItemInf, UserData> {
  workNameSpace:string = UserListNameSpace;

  columns: StandardTableColumnProps<UserItemInf>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '昵称',
      dataIndex: 'nick',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: value => <Avatar src={value} />,
    },
    {
      title: 'email',
      dataIndex: 'email',
      align: 'right',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      align: 'right',
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    this.statusColumn,
    this.updatedColumn,
    this.controlColumn,
  ];


  createForm = () => {
    const parentMethods = {
      handleAction: this.handleAddOrUpdate,
      handleModalVisible: this.handleModalVisible,
    };
    const { modalVisible, record } = this.state;
    const data = this.getListData();
    return (<AddOrUpdateForm {...parentMethods} modalVisible={modalVisible} departMap={data.departMap ||  {}} record={record} />);
  }


  formatTableData = () => {
    const data = this.getListData();
    return { list: data.users || [], pagination: data.pagination || {} };
  }
}

export default Form.create<DataInf<UserData>>()(UsersTableList);
