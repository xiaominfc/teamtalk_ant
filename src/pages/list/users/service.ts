import request from '@/utils/request';


export interface QueryActionInf {
  queryRule:Function;
  removeRule:Function;
  addRule:Function;
  updateRule:Function;
}


export class QueryAction<T, S> implements QueryActionInf {
  action:string = '';

  constructor(action:string) {
    this.action = action;
  }

  _req_action = () => `/api/${this.action}`

  _method_post = (params:{}, method:string) => request(this._req_action(), {
      method: 'POST',
      data: {
        ...params,
        method,
      },
    })

  queryRule = async (params: Partial<T>) => request(this._req_action(),
        { params },
    )

  removeRule = async (params:{}) => this._method_post(params, 'delete')

  addRule = async (params: S) => this._method_post(params, 'add')

  updateRule = async (params: S) => this._method_post(params, 'update')
}
