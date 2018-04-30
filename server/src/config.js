const {
  PY_API_URL,
  SERVER_PORT,
  PY_CLIENT_ID,
  PY_CLIENT_SECRET,
  PY_RESTAURANT_LOGO_API_URL,
  PY_PROFILE_API_URL
} = process.env;

module.exports = {
  PY_RESTAURANT_LOGO_API_URL,
  PY_PROFILE_API_URL,
  PY_API_TOKEN_URI: `${PY_API_URL}/tokens?clientId=${PY_CLIENT_ID}&clientSecret=${PY_CLIENT_SECRET}`,
  PY_SIGN_IN_URI: `${PY_API_URL}/tokens?userName={0}&password={1}`,
  PY_GET_USER_URI: `${PY_API_URL}/myAccount`,
  PY_GET_RESTAURANTS_URI: `${PY_API_URL}/search/restaurants`,
  SERVER_PORT: SERVER_PORT || 3001,
  AUTHORIZATION_HEADER: 'Authorization'
};