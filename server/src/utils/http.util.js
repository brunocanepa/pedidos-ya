const axios = require('axios');
const ResponseData = require('./ResponseData.util');

module.exports = {
  get: async({url, headers = {}}) => {
    const instance = axios.create({
      baseURL: url,
      headers: headers
    });

    const {data, status} = await instance
      .get(url)
      .catch(error => {
        return new ResponseData({status: error.response.status});
      });

    return new ResponseData({data, success: status == 200, status });
  }
};