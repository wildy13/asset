const { Section, Dapartment } = require('./relations');

const getSection = async (req, res) => {
  try {
    const section = await Section.findAll({
      attributes: ['id', 'sectionCode', 'name', 'dapartmentId', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Dapartment,
          attributes: ['name'],
        },
      ],
    });
    res.json(section);
  } catch (error) {
    res.status(400).send(error);
  }
};
const filterSection = async (req, res) => {
  try {
    const section = await Section.findAll({
      attributes: ['id', 'sectionCode', 'name', 'dapartmentId', 'createdAt', 'updatedAt'],
      where: {
        dapartmentId: req.body.id,
      },
    });
    res.json(section);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputSection = async (req, res) => {
  const {
    id, sectionCode, dapartmentId, name,
  } = req.body;
  try {
    const create = await Section.create({
      name, sectionCode, dapartmentId,
    });
    res.json({ data: create, msg: 'yeay section in' });
  } catch (error) {
    if (id === Section.id) {
      res.status(400).send(error);
    }
  }
};

const deleteSection = async (req, res) => {
  await Promise.all(
    req.body.data.payload.map(async (payload) => {
      await Section.destroy({
        where: {
          id: payload.id,
        },
      });
    }),
  );
  return res.json(req.body.data.payload);
};

const editSection = async (req, res) => {
  const section = await Section.findOne({
    attributes: [
      'id',
      'sectionCode',
      'dapartmentId',
      'name',
    ],
    where: {
      id: req.params.id,
    },
  });
  section.name = req.body.name;
  const save = await section.save();
  res.status(200).json(save);
};

module.exports = {
  getSection, filterSection, inputSection, deleteSection, editSection,
};
