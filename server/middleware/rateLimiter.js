const redisClient = require('../config/redisConfig');

const RATE_LIMIT_WINDOW_SECONDS = 60; 

//Function to check rate limit for a specific IP
const checkRateLimit = async (ip,max_request) => {
  const key = `rate-limit:${ip}`;
  const count = await redisClient.get(key);
    console.log(count);
  if (count && parseInt(count) >= max_request) {
    return false; // Rate limit exceeded
  }

  return true;
};

//Function to update rate limit counter
const updateRateLimit = async (ip) => {
  const key = `rate-limit:${ip}`;
  const expiration = RATE_LIMIT_WINDOW_SECONDS;

  await redisClient. incr(key);
  await redisClient.expire(key, expiration);
};

//Main function
const rateLimiter = (max_request) => async (req, res, next) => {
    const ip = req.ip;
  
    const allowed = await checkRateLimit(ip, max_request);
    if (!allowed) {
      return res.status(429).json({ message: 'Too many requests, please try again later' });
    }
  
    updateRateLimit(ip);
    next();
};

module.exports = rateLimiter;