// Configuration of your node environment would usually go in a .env file, but we have not covered that material yet
const env = {
  NODE_ENV: 'development'
};

const testDb = { db: { msgs: [] } };

module.exports = { env, testDb };
