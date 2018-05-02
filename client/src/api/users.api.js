import {getHttp, getUserSession} from './http';

const get = async () => {
  const {success, data} = await getHttp(`users`);
  return success ? data : {};
};

export default {
  get
};