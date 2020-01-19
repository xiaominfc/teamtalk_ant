import { Row, Col, Modal, Tag, Button, Divider, Pagination } from 'antd';
import React, { Component } from 'react';

import { GroupItemInf,GroupUserInf } from '../data';
import request from '@/utils/request';
import { UserData } from '../../users/data';
import { UserItemInf } from '../../users/data.d';
import CheckableTag from 'antd/lib/tag/CheckableTag';



interface EditGroupMemberModalProps {
  modalVisible: boolean;
  handleAction: (fieldsValue: GroupItemInf) => void;
  handleModalVisible: () => void;
  record:Partial<GroupItemInf>;
  match:{};
}

interface EditGroupMemberModalState {
	groupMembers:GroupUserInf[];
	userData:UserData;	
}


class EditGroupMemberModal extends Component<EditGroupMemberModalProps>{

	state:EditGroupMemberModalState = {
		groupMembers:[],
		userData:{
			users:[],
			departMap:{},
			pagination:{current:0,pageSize:0,total:0}
		},
	}

	removeUser = (item:GroupUserInf) => {
		const {record} = this.props;
		request('/api/editmember',{data:{
			id: record.id,
			userId: item.userId,
			change: 2,
		},method: 'POST'}).then((response)=>{
			console.log(response);
		});

		let {groupMembers} = this.state;
		groupMembers = groupMembers.filter((itemInf:GroupUserInf)=>{
			return itemInf.userId != item.userId;
		});
		this.setState({groupMembers:groupMembers})
		
	};


	addUser = (item:UserItemInf) => {
		const {record} = this.props;
		request('/api/editmember',{data:{
			id: record.id,
			userId: item.id,
			change: 1,
		},method: 'POST'}).then((response)=>{
			console.log(response);
		});
		const {groupMembers} = this.state;
		groupMembers.push({userId:item.id,name:item.name,id:"0",groupId:record.id})
		this.setState({groupMembers:groupMembers})
	};


	componentDidUpdate(prevProps:EditGroupMemberModalProps) {
		const {record,match} = this.props;
		
		const extends_p = match['params'] || {};
		if (record.id !== prevProps.record.id) {
			request('/api/groupusers',{params:{...extends_p,id:record.id}}).then((response)=>{
				this.setState({groupMembers:response['users']});
			});
			request('/api/user',{params:{...extends_p}}).then((response)=>{
				this.setState({userData:response});
			});
		}
	}

	onPageChage = (page: number, pageSize?: number) =>{
		const {match} = this.props;
		const extends_p = match['params'] || {};
		request('/api/user',{params:{currentPage:page,pageSize,...extends_p}}).then((response)=>{
			this.setState({userData:response});
		});
	}

	render() {
		const { modalVisible, handleModalVisible} = this.props;
		const {groupMembers,userData} = this.state;
		const tags:JSX.Element[] = [];

		const members:string[] = []

		const userTags:JSX.Element[] = [];
		groupMembers.map((item:GroupUserInf)=>{
			tags.push(<Tag key={item.userId}  closable onClose={()=>{this.removeUser(item)}} >{item.name}</Tag>)
			members.push(item.userId||'');
		});

		userData.users.map((item:UserItemInf)=> {
			if(members.indexOf(item.id)<0) {
				userTags.push(<CheckableTag key={item.id} checked onChange={()=>{
					this.addUser(item);
				}} >{item.name}</CheckableTag>)
			}
		})

		return (
			<Modal
			destroyOnClose
			title={"编辑群成员"}
			visible={modalVisible}
			onOk={() => handleModalVisible()}
			onCancel={() => handleModalVisible()}
			footer={[
				<Button key="submit" type="primary"  onClick={() => handleModalVisible()}>
				  确定
				</Button>,
			  ]}
			>
			<Row>
			{tags}
			</Row>
			<Divider
				type='horizontal'
			></Divider>
			<Row>
			{userTags}
			<Divider
				type='horizontal'
			></Divider>
			</Row>
			<Row type="flex" justify="space-around" align="middle">
			<Col >
			<Pagination current={userData.pagination.current} size="small" total={userData.pagination.total} pageSize={userData.pagination.pageSize} onChange={this.onPageChage} ></Pagination>
			</Col>
			</Row>
			</Modal>
		);
	}
}

export default EditGroupMemberModal;