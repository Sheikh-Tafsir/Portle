// redisConfig.js
const Redis = require('ioredis');
require('dotenv').config();

// Create Redis connection
const redis = new Redis({
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});
// Test Redis connection
redis.ping().then(() => {
    console.log('Connected to Redis');
}).catch(err => {
    console.error('Error connecting to Redis:', err);
});

redis.getAsync = async (key) => {
    return await redis.get(key);
};

redis.setAsync = async (key, value) => {
    return await redis.set(key, value);
};

// Close Redis connection when the application exits
process.on('exit', () => {
    redis.quit();
    console.log('Redis connection closed');
});

module.exports = redis;
