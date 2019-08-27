import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListParams, UserItemInf } from './data.d';


let userListDataSource: Partial<UserItemInf>[] = [];

const users_data = { users: [{ id: '1', sex: '\u7537', name: 'xiaominfc', domain: 'x', nick: 'xiaominfc', password: 'b5584f820b23d09261670b5fcc574716', salt: '6979', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510746494832737_139781404018.jpg', departId: '1', status: '0', created: '1503291591', updated: '1560156134', push_shield_status: '0', sign_info: '\u6d4b\u8bd5\u7b7e\u540d1', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510746494832737_139781404018.jpg' }, { id: '2', sex: '\u7537', name: 'xiaoyang', domain: 'x', nick: 'xiaoyang', password: 'c7b538a82a442a3622048b6b08f3b8a5', salt: '1932', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1562578191413527_140516759734.jpg', departId: '1', status: '0', created: '1503301405', updated: '1562578194', push_shield_status: '0', sign_info: '666\u5e74\u751f\u547d\u4e2d\u90a3\u4e9b\u5417', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1562578191413527_140516759734.jpg' }, { id: '3', sex: '\u7537', name: '\u5c0f\u9648', domain: '#', nick: '\u5c0f\u9648', password: '338fb64fd1e32e55f2e1d1dca029bb99', salt: '2898', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510745671617608_139781395625.jpg', departId: '1', status: '0', created: '1504402280', updated: '1510745675', push_shield_status: '0', sign_info: '', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510745671617608_139781395625.jpg' }, { id: '4', sex: '\u5973', name: '\u5c0f\u6b23', domain: '#', nick: '\u5c0f\u6b23', password: '1bb24016c4320317d4587f2195e9172e', salt: '4623', phone: '', email: '907029391@qq.com', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510745713406516_139781395625.jpg', departId: '1', status: '0', created: '1504402670', updated: '1510745715', push_shield_status: '0', sign_info: '', adminId: '0', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510745713406516_139781395625.jpg' }, { id: '5', sex: '\u7537', name: 'test', domain: 't', nick: 'test', password: 'be0dfe3f3fec999ea327c4288b287b8f', salt: '7022', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510741718400597_139781395625.jpg', departId: '1', status: '0', created: '1510741738', updated: '1558321726', push_shield_status: '1', sign_info: '', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510741718400597_139781395625.jpg' }, { id: '6', sex: '\u7537', name: 'xiaominfc2', domain: 'x', nick: 'xiaominfc2', password: 'b3f85781625f20307bf7fac3004a3730', salt: '8776', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510746526268588_139781404018.jpg', departId: '1', status: '0', created: '1510746529', updated: '1510746529', push_shield_status: '0', sign_info: '', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510746526268588_139781404018.jpg' }, { id: '7', sex: '\u7537', name: 'ai', domain: 'a', nick: '\u673a\u5668\u4eba', password: '34066a34b3b899e5dd4dec3de0edaf69', salt: '8199', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510745671617608_139781395625.jpg', departId: '1', status: '0', created: '1523174365', updated: '1523174365', push_shield_status: '0', sign_info: '', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510745671617608_139781395625.jpg' }, { id: '8', sex: '\u7537', name: '1001', domain: '#', nick: '1001', password: '5fae33cc646642e235991f07a4fd500a', salt: '26', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/', departId: '1', status: '0', created: '1525535301', updated: '1525535301', push_shield_status: '0', sign_info: '', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/' }, { id: '9', sex: '\u7537', name: '1002', domain: '#', nick: '1002', password: '80f94c35cece273ac739792a89b75069', salt: '7529', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510745671617608_139781395625.jpg', departId: '1', status: '0', created: '1525535900', updated: '1525535900', push_shield_status: '0', sign_info: '', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1510745671617608_139781395625.jpg' }, { id: '10', sex: '\u7537', name: '1003', domain: '#', nick: '1003', password: 'ba48098c156aae656ec10acef3c72e5d', salt: '3635', phone: '', email: '', avatar: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1525536110651350_140039427282.png', departId: '1', status: '0', created: '1525536114', updated: '1525536114', push_shield_status: '0', sign_info: '', adminId: '1', depart_value: '\u8fd0\u8425\u90e8', avatar_value: 'http:\/\/msfs.xiaominfc.com\/g0\/000\/000\/1525536110651350_140039427282.png' }], page: 0, count: 2, departs: { 1: { id: '1', departName: '\u8fd0\u8425\u90e8', priority: '1', parentId: '0', status: '0', created: '1504402505', updated: '1504402505' } } };
for (let i = 0; i < users_data.users.length; i += 1) {
  const userInfo = users_data.users[i];
  userListDataSource.push(userInfo);
}

const departSource = users_data.departs;

function getRule(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;

  let dataSource = userListDataSource;
  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource: Partial<UserItemInf>[] = [];
    status.forEach((s: string) => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(item => {
          if (parseInt(`${item.status}`, 10) === parseInt(s.split('')[0], 10)) {
            return true;
          }
          return false;
        }),
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
      users: dataSource,
      departMap: departSource,
      pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(`${params.currentPage}`, 10) || 1,
    },
  };
  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, id, record } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      userListDataSource = userListDataSource.filter(item => id.indexOf(item.id) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      record.id = i;
      userListDataSource.unshift(record);
      break;
    case 'update':
      userListDataSource = userListDataSource.map(item => {
        if (item.id === record.id) {
          return { ...record };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
      users: userListDataSource,
      departMap: departSource,
      pagination: {
          total: userListDataSource.length,
      },
  };

  return res.json(result);
}

export default {
  'GET /api/user': getRule,
  'POST /api/user': postRule,
};
