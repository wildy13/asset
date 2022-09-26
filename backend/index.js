const express = require('express');
const cors = require('cors');
const router = require('./router');
const { sequelize, config: { host, port } } = require('./config');
const { verifyToken } = require('./api/auth/service');

const app = express();
app.use(cors());
app.use(express.json());
app.use(verifyToken);

const connect = async (res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json('Connection has been established successfully.');
  } catch (err) {
    throw new Error(err);
  }
};

const start = async () => {
  try {
    router(app);
    // Assets.sync({ force:true })       // <------Force Model to database
    app.listen({ port, host }, (res) => res.status(200).json(`Server running on port ${port}`));
    await connect();
  } catch (err) {
    process.exit(1);
    throw new Error(err);
  }
};

start();
