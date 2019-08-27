
import { extend } from 'umi-request';





export interface BaseItemInf {
  id:string;
}

export interface AnswerResult {
  status:string;
  msg:string;
}


export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}


export interface UserItemInf extends BaseItemInf{
  sex: string;
  name: string;
  nick: string;
  phone: string;
  email: string;
  avatar: string;
  status: string;
  updated: string;
  password: string;
  departId: string;
  departName: string;
}


export interface DepartItemInf {
    id: string;
    departName:string;
}

export interface PageTableListData {
  pagination: Partial<TableListPagination>;
}

export interface UserData extends PageTableListData{
    users: UserItemInf[];
    departMap: {[id:string]:Partial<DepartItemInf>};
}


