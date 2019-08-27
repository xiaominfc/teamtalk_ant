import request from '@/utils/request';
import { FormDataType } from './index';

export async function fakeAccountLogin(params: FormDataType) {
  const data = { account: params.userName, password: params.password, submit: 1 };
  return request('/api/login/account', {
    method: 'POST',
    data,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
