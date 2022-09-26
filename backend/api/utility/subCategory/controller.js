const SubCategory = require('./model');

const getSubCategory = async (req, res) => {
  try {
    const subcategory = await SubCategory.findAll({
      attributes: ['id', 'name', 'subcategoryCode', 'categoryId', 'createdAt', 'updatedAt'],
    });
    res.json(subcategory);
  } catch (error) {
    res.status(400).send(error);
  }
};

const filterSubCategory = async (req, res) => {
  try {
    const subcategory = await SubCategory.findAll({
      attributes: ['id', 'name', 'subcategoryCode', 'categoryId'],
      where: {
        categoryId: req.body.id,
      },
    });
    res.json(subcategory);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputSubCategory = async (req, res) => {
  const {
    id, name, subcategoryCode, categoryId,
  } = req.body;
  try {
    const create = await SubCategory.create({
      name, subcategoryCode, categoryId,
    });
    res.json({ data: create, msg: "yeay category's in" });
  } catch (error) {
    if (id === SubCategory.id) {
      res.status(400).send(error);
    }
  }
};

const deleteSubCategory = async (req, res) => {
  await Promise.all(
    req.body.data.payload.map(async (payload) => {
      await SubCategory.destroy({
        where: {
          id: payload.id,
        },
      });
    }),
  );
  return res.json(req.body.data.payload);
};

const editSubCategory = async (req, res) => {
  const subcategory = await SubCategory.findOne({
    attributes: [
      'id',
      'name',
      'subcategoryCode',
      'categoryId',
    ],
    where: {
      id: req.params.id,
    },
  });
  subcategory.name = req.body.name;
  subcategory.subcategoryCode = req.body.subcategoryCode;

  const save = await subcategory.save();
  res.status(200).json(save);
};

module.exports = {
  getSubCategory, filterSubCategory, inputSubCategory, deleteSubCategory, editSubCategory,
};
