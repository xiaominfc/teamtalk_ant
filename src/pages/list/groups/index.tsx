/*
 * FileName: index.tsx
 * Project: tt_ucenter
 * Created Date: Saturday August 24th 2019, 17:56:23
 * Author: xiaominfc
 * Email: xiaominfc@126.com
 * Origin: xiaominfc.com
 */


import {
	Form, Avatar,
  } from 'antd';
import {BaseTableList, DataInf} from '../users'
import { StandardTableColumnProps }from '../users/components/StandardTable';
import { GroupItemInf,GroupData } from './data.d';
import AddOrUpdateForm from './components/AddOrUpdateForm';
import { connect } from 'dva';
import React from 'react';


const GroupListNameSpace = "listGroups";

@connect(
  (result:{}) => {
    return ({
    list:result[GroupListNameSpace],
    loading: result['loading'].models[GroupListNameSpace],
  });
  },
)
class GroupTableList extends BaseTableList<GroupItemInf,GroupData> {
	workNameSpace = GroupListNameSpace;
	columns: StandardTableColumnProps<GroupItemInf>[] = [
		{
		  title: 'ID',
		  dataIndex: 'id',
		},
		{
		  title: '群名',
		  dataIndex: 'name',
		},
		{
			title: '头像',
			dataIndex: 'avatar',
			render: value => <Avatar src={value} />,
		},
		{
			title: '群类型',
			dataIndex: 'type',
		render: (val: string) => {
			if(val == '1') {
				return (<span>普通群</span>);
			}
			return (<span>临时群</span>);
		},
		},
		this.statusColumn,
		this.updatedColumn,
    	this.controlColumn,
	  ];

	formatTableData = () => {
		const data = this.getListData();
		return {list: data.groups ||[], pagination: data.pagination || {}};
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

export default Form.create<DataInf<GroupData>>()(GroupTableList);