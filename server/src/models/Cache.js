const uuid = require('../utils/uuid.util');
const redis = require('../utils/redis.util');
const config = require('../config');

const RESTAURANTS_MAX_LAST_SEARCHES = 10;

const keys = {
  lastRestaurantsSearches: 'last_restaurants_searches',
  onlineUsers: 'online_users',
  onlineUsersCount: 'online_users_count',
  restaurantPrefix: 'restaurant',
  userPrefix: 'user',
  restaurantsCacheTime: 'restaurants_cache_time'
};

function Cache() {
  const self = this;
  self.users = {/* userId: { sessions: {token} }*/};
  self.data = redis();
};

Cache.prototype.getUser = function(userId) {
  return this.users[userId];
};

Cache.prototype.getSession = function({userId, token}) {
  const user = this.getUser(userId);
  return user && user.sessions[token];
};

Cache.prototype.addSession = async function({userId, token}){
  let user = this.getUser(userId);
  if (user) {
    user.sessions[token] = token;
  } else {
    await this.updateUsersOnlineCount();
    user = this.users[userId] = {sessions: {[token]: token}};
  }
};

Cache.prototype.removeSession = async function({userId, token}) {
  const user = this.getUser(userId);
  if (user) {
    delete user.sessions[token];
    if (Object.keys(user.sessions).length == 0) {
      await this.updateUsersOnlineCount(false);
      delete this.users[userId]
    }
  }
};

Cache.prototype.isValidSession = function({userId, token}) { 
  return !!this.getSession({userId, token});
};

Cache.prototype.getOnlineUsersCount = async function() {
  const count = await this.data.get({key: keys.onlineUsersCount});
  return count || 0;
};

Cache.prototype.updateUsersOnlineCount = async function(add = true) {
  const key = keys.onlineUsersCount;
  const count = await this.getOnlineUsersCount();
  this.data.set({key, value: add ? count + 1 : count - 1});
};

Cache.prototype.getRestaurantsLastSearches = function() {
  return this.data.getList({key: keys.lastRestaurantsSearches});
};

Cache.prototype.addRestaurantSearch = async function(search) {
  const searches = await this.data.getList({key: keys.lastRestaurantsSearches});

  if (searches.length >= RESTAURANTS_MAX_LAST_SEARCHES) {
    this.data.leftPop({key: keys.lastRestaurantsSearches});
  }

  const {latitude, longitude} = search;
  const value = {id: uuid('search'), latitude, longitude};

  this.data.rightPush({key: keys.lastRestaurantsSearches, value});
  this.data.set({key: getRestaurantKey(search), value: search.restaurants, expires: true});
};

Cache.prototype.getRestaurants = function(coordinates) {
  return this.data.get({key: getRestaurantKey(coordinates)});
};

Cache.prototype.getRestaurantsCacheTime = function() {
  return process.env[config.RESTAURANTS_CACHE_CONTROL_TIME_KEY];
};

Cache.prototype.setRestaurantsCacheTime = function(time) {
  this.data.set({key: keys.restaurantsCacheTime, value: time});
  process.env[config.RESTAURANTS_CACHE_CONTROL_TIME_KEY] = time;
};

const getRestaurantKey = ({latitude, longitude}) => {
  return `${keys.restaurantPrefix}_${latitude},${longitude}`;
};

const getUserKey = ({userId}) => {
  return `${keys.userPrefix}_${userId}`;
};

const cache = new Cache();

const loadRestaurantsCacheTime = async() => {
  const time = await cache.data.get({key: keys.restaurantsCacheTime});
  if (time !== null) {
    process.env[config.RESTAURANTS_CACHE_CONTROL_TIME_KEY] = time;
  }
};

loadRestaurantsCacheTime();

module.exports = cache;