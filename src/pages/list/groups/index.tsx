/*
 * FileName: index.tsx
 * Project: tt_ucenter
 * Created Date: Saturday August 24th 2019, 17:56:23
 * Author: xiaominfc
 * Email: xiaominfc@126.com
 * Origin: xiaominfc.com
 */


import {
	Form, Avatar, Divider,
  } from 'antd';
import {BaseTableList, DataInf, TableListState} from '../users'
import { StandardTableColumnProps }from '../users/components/StandardTable';
import { GroupItemInf,GroupData, GroupUserInf } from './data.d';
import AddOrUpdateForm from './components/AddOrUpdateForm';
import EditGroupMemberModal from './components/EditGroupMember';
import { connect } from 'dva';
import React, { Fragment } from 'react';
import { BaseItemInf } from '../users/data.d';


interface GroupTableListState<T extends BaseItemInf> extends TableListState<T> {
	editGroupMemberModal:boolean;
	groupMembers:GroupUserInf[];
}


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

	controlColumn:StandardTableColumnProps<GroupItemInf> = {
		title: '操作',
		render: (text, record) => (
		  <Fragment>
			<a onClick={() => {
			  this.editOrAddRecord(record)
			}}>编辑</a>
			<Divider type="vertical" />
			<a onClick={() => {
			  this.editGroupMember(record)
			}}>编辑群成员</a>
			<Divider type="vertical" />
			<a onClick={() => {
			  this.removeRecord(record);
			}}>移除</a>
		  </Fragment>
		),
	  }

	state:GroupTableListState<GroupItemInf> = {
		modalVisible: false,
    	updateModalVisible: false,
    	selectedRows: [],
    	record: {},
		editGroupMemberModal:false,
		groupMembers:[],
	};

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

	editGroupMember = (record:GroupItemInf) => {
		this.setState({editGroupMemberModal:true,record})
	}

	handleEditGroupMemberModalVisible = (flag?: boolean) => {
		this.setState({
			editGroupMemberModal: !!flag,
		});
	}



	createForm = () => {
		const parentMethods = {
		  handleAction: this.handleAddOrUpdate,
		  handleModalVisible: this.handleModalVisible,
		};

		const editGroupMemberMethods = {
			handleAction: this.handleAddOrUpdate,
			handleModalVisible: this.handleEditGroupMemberModalVisible,
		  };
		const { modalVisible, record } = this.state;
		const {editGroupMemberModal} = this.state;

		return (
			<div>
				<AddOrUpdateForm {...parentMethods} modalVisible={modalVisible} record={record} />
				<EditGroupMemberModal {...editGroupMemberMethods} modalVisible={editGroupMemberModal} record={record} />
			</div>
			);
	  }
}

export default Form.create<DataInf<GroupData>>()(GroupTableList);