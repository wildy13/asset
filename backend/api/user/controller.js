const User = require('./model');

const getUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: [
        'id',
        'employeeNo',
        'username',
        'email',
        'dapartementId',
        'sectionId',
        'roleId',
      ],
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: [
        'id',
        'employeeNo',
        'username',
        'email',
        'dapartementId',
        'sectionId',
        'roleId',
      ],
      where: { username: req.auth.username },
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  const {
    employeeNo,
    username,
    email,
    dapartementId,
    sectionId,
    password,
    confPassword,
    roleId,
  } = req.body;
  try {
    const newUser = new User({
      employeeNo,
      username,
      email,
      dapartementId,
      sectionId,
      password,
      confPassword,
      roleId,
    });
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send(error.errors[0].message);
    } else {
      res.status(500).send(error);
    }
  }
};

const deleteUsers = async (req, res) => {
  await Promise.all(
    req.body.data.payload.map(async (payload) => {
      await User.destroy({
        where: { id: payload.id },
      });
    }),
  );
  return res.json(req.body.data.payload);
};

const editUsers = async (req, res) => {
  const user = await User.findOne({
    attributes: [
      'id',
      'employeeNo',
      'username',
      'email',
      'dapartementId',
      'sectionId',
      'roleId',
    ],
    where: {
      id: req.params.id,
    },
  });
  user.username = req.body.username;
  user.employeeNo = req.body.employeeNo;
  user.email = req.body.email;
  user.sectionId = req.body.sectionId;
  user.dapartementId = req.body.dapartementId;
  user.roleId = req.body.roleId;

  const save = await user.save();
  res.status(200).json(save);
};

const changePassword = async (req) => {
  const user = await User.findOne({
    attributes: [
      'id',
      'password',
    ],
    where: {
      id: req.params.id,
    },
  });
  console.log(user);
};
module.exports = {
  getUser,
  getMe,
  createUser,
  deleteUsers,
  editUsers,
  changePassword,
};
