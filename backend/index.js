/* eslint-disable linebreak-style */
const express = require('express');
const cors = require('cors');
const router = require('./router');
const { sequelize, config: { host, port } } = require('./config');
const { verifyToken } = require('./api/auth/service');
// const Assets = require('./api/asset/model');
// const User = require('./api/user/model');

const app = express();
app.use(cors());
app.use(express.json());
app.use(verifyToken);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    throw new Error(err);
  }
};

const start = async () => {
  try {
    router(app);
    // Assets.sync({ force: true }); // <------Force Model to database
    app.listen({ port, host }, () => console.log(`Server running on port ${port}`));
    await connect();
  } catch (err) {
    process.exit(1);
    throw new Error(err);
  }
};

start();
