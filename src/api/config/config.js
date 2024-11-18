require('dotenv').config();

const config={
  env: process.env.NODE_ENV || 'Development',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbCluster: process.env.DB_CLUSTER,
  dbName: process.env.DB_NAME,
  tokenSecret: process.env.TOKEN_SECRET,
}

module.exports = { config };
