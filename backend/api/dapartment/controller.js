const Dapartment = require('./model');

const getDapartment = async (req, res) => {
  try {
    const dapartment = await Dapartment.findAll({
      attributes: ['id', 'dapartmentCode', 'name', 'createdAt', 'updatedAt'],
    });
    res.json(dapartment);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputDapartment = async (req, res) => {
  const { id, dapartmentCode, name } = req.body;
  try {
    const create = await Dapartment.create({
      name, dapartmentCode,
    });
    res.json({ data: create, msg: "yeay dapartment's in" });
  } catch (error) {
    if (id === Dapartment.id) {
      res.status(400).send(error);
    }
  }
};

const deleteDapartment = async (req, res) => {
  await Promise.all(
    req.body.data.payload.map(async (payload) => {
      await Dapartment.destroy({
        where: {
          id: payload.id,
        },
      });
    }),
  );
  return res.json(req.body.data.payload);
};

const editDapartment = async (req, res) => {
  const dapartment = await Dapartment.findOne({
    attributes: [
      'id',
      'dapartmentCode',
      'name',
    ],
    where: {
      id: req.params.id,
    },
  });
  dapartment.name = req.body.name;

  const save = await dapartment.save();
  res.status(200).json(save);
};

module.exports = {
  getDapartment, inputDapartment, deleteDapartment, editDapartment,
};
