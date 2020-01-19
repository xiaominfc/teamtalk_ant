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
	Modal,
	message,
	Divider
  } from 'antd';

import { connect } from 'dva';
import { BaseTableList, DataInf } from '../users'
import { StandardTableColumnProps } from '../users/components/StandardTable';
import { ProjectItemInf, ProjectData } from './data.d';
import {AnswerResult } from '../users/data.d';
import React, {  Fragment } from 'react';
import AddOrUpdateForm from './components/AddOrUpdateForm';
import {Link} from 'dva/router';
const { confirm } = Modal;


// const types = ['admin', 'user'];
// const typesTexts = types.map((value, index) => ({ text: value, value: `${index}` }));


const ProjectListNameSpace = 'listProjects';

@connect(
  (result:{}) => {
    return ({
    list: result[ProjectListNameSpace],
    loading: result['loading'].models[ProjectListNameSpace],
  });
  },
)
class ProjectTableList extends BaseTableList<ProjectItemInf, ProjectData> {
	workNameSpace=ProjectListNameSpace;

	controlColumn:StandardTableColumnProps<ProjectItemInf> = {
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
			 <Divider type="vertical" />
			 <Link 
			 to={`/project/${record.id}/users`}
			 >查看</Link>
		   </Fragment>
		 ),
	   }
	columns: StandardTableColumnProps<ProjectItemInf>[] = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '项目名',
			dataIndex: 'name',
		},
		{
			title: '类型',
			dataIndex: 'type',
			render: (val: string) => {
				if (val == '1') {
					return (<span>组织/机构</span>);
				}
				return (<span>自由社交</span>);
			},
		},
		this.updatedColumn,
		this.controlColumn,
	];

	formatTableData = () => {
		const data = this.getListData();
		return { list: data.projects || [], pagination: data.pagination || {} };
	}


	handleSureDeleteModal= (flag?:boolean)=> {
		this.setState({
			sureModalVisable:!!flag
		});
	}

	removeRecord = (record:ProjectItemInf) => {
		const { dispatch } = this.props;
		var _self=this
		confirm({
			title: '确认移除该项目',
			content: '与之关联的用户以及群聊也将被移除',
			onOk() {
				dispatch({
					type: `${_self.workNameSpace}/remove`,
					payload: {
						id: record.id,
					},
					callback: (response:AnswerResult) => {
						if(response.status ==  'failed') {
							message.warn(response.msg);
						}else {
							_self.setState({

							});
							_self.reloadCurrent();
						}
					},
				});

			},
			onCancel() {},
		});
	}

	createForm = () => {
		const parentMethods = {
		  handleAction: this.handleAddOrUpdate,
		  handleModalVisible: this.handleModalVisible,
		};
		const { modalVisible, record} = this.state;
		return (
			<AddOrUpdateForm {...parentMethods} modalVisible={modalVisible} record={record} />
			)
	}
}

export default Form.create<DataInf<ProjectData>>()(ProjectTableList);
