/*
 * FileName: index.tsx
 * Project: tt_ucenter
 * Created Date: Saturday August 24th 2019, 17:56:23
 * Author: xiaominfc
 * Email: xiaominfc@126.com
 * Origin: xiaominfc.com
 */

import {
	Form,
  } from 'antd';

import { connect } from 'dva';
import { BaseTableList, DataInf } from '../users'
import { StandardTableColumnProps } from '../users/components/StandardTable';
import { AdminItemInf, AdminData } from './data.d';
import React from 'react';
import AddOrUpdateForm from './components/AddOrUpdateForm';

// const types = ['admin', 'user'];
// const typesTexts = types.map((value, index) => ({ text: value, value: `${index}` }));


const AdminListNameSpace = 'listAdmins';

@connect(
  (result:{}) => {
    return ({
    list: result[AdminListNameSpace],
    loading: result['loading'].models[AdminListNameSpace],
  });
  },
)
class AdminTableList extends BaseTableList<AdminItemInf, AdminData> {
	workNameSpace=AdminListNameSpace;

	columns: StandardTableColumnProps<AdminItemInf>[] = [
		{
		  title: 'ID',
		  dataIndex: 'id',
		},
		{
		  title: '用户名',
		  dataIndex: 'uname',
		},
		{
			title: '类型',
			dataIndex: 'type',
			render: (val: string) => {
				if (val == '1') {
					return (<span>admin</span>);
				}
				return (<span>user</span>);
			},
		},
		this.updatedColumn,
    	this.controlColumn,
	  ];

	formatTableData = () => {
		const data = this.getListData();
		return { list: data.admin_users || [], pagination: data.pagination || {} };
	}

	createForm = () => {
		const parentMethods = {
		  handleAction: this.handleAddOrUpdate,
		  handleModalVisible: this.handleModalVisible,
		};
		const { modalVisible, record } = this.state;
		return (<AddOrUpdateForm {...parentMethods} modalVisible={modalVisible} record={record} />);
	  }
}

export default Form.create<DataInf<AdminData>>()(AdminTableList);
