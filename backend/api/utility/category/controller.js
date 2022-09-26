const Category = require('./model');

const getCategory = async (req, res) => {
  try {
    const category = await Category.findAll({
      attributes: ['id', 'name', 'categoryCode', 'createdAt', 'updatedAt'],
    });
    res.json(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputCategory = async (req, res) => {
  const { id, name, categoryCode } = req.body;
  try {
    const create = await Category.create({
      name, categoryCode,
    });
    res.json({ data: create, msg: "yeay category's in" });
  } catch (error) {
    if (id === Category.id) {
      res.status(400).send(error);
    }
  }
};

const deleteCategory = async (req, res) => {
  await Promise.all(
    req.body.data.payload.map(async (payload) => {
      await Category.destroy({
        where: {
          id: payload.id,
        },
      });
    }),
  );
  return res.json(req.body.data.payload);
};

const editCategory = async (req, res) => {
  const category = await Category.findOne({
    attributes: [
      'id',
      'name',
      'categoryCode',
    ],
    where: {
      id: req.params.id,
    },
  });
  category.name = req.body.name;
  category.categoryCode = req.body.categoryCode;

  const save = await category.save();
  res.status(200).json(save);
};

module.exports = {
  getCategory, inputCategory, deleteCategory, editCategory,
};
