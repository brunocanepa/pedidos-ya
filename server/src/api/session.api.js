const {signIn, signOut} = require('../services');
const {AUTHORIZATION_HEADER} = require('../config');
const {http, headers} = require('../utils');
const {statusCodes} = http;

const signInEndpoint = async(req, res) => {
  const result = await signIn(req.body);
  const {data, success} = result;

  if (success) {
    res.set(AUTHORIZATION_HEADER, data.sessionToken);
    res.set('Access-Control-Expose-Headers', AUTHORIZATION_HEADER);
    res.send({success, data});
  } else {
    res.status(statusCodes.UNAUTHORIZED).send(result);
  }
};

const signOutEndpoint = async(req, res) => {
  const token = headers.get({req, key: AUTHORIZATION_HEADER});

  const result = await signOut({token});

  res.send(result);
};

module.exports = (router) => {
  router.post('/', signInEndpoint);
  router.delete('/', signOutEndpoint);
  return router;
};