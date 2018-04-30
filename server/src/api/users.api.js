const {getUser} = require('../services');
const {AUTHORIZATION_HEADER} = require('../config');
const {headers} = require('../utils');

const getEndpoint = async(req, res) => {
  const sessionToken = headers.get({req, AUTHORIZATION_HEADER});
  const result = await getUser({sessionToken});

  if (result.success) {
    res.send(result);
  } else {
    res.status(401).send(result);
  }
};

module.exports = (router) => {
  router.get('/', getEndpoint);
  return router;
};