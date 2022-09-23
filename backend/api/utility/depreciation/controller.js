const Depreciation = require('./model')

const getDepreciation = async (req, res) => {
  try {
    const depreciation = await Depreciation.findAll({
      attributes: ['id', 'type','year','rate','method','categoryId','subcategoryId', 'createdAt', 'updatedAt'],
    });
    res.json(depreciation);
  } catch (error) {
    res.status(400).send(error);
  }
};

const filterDepreciation = async (req, res) => {
  try {
    const depreciation = await Depreciation.findOne({
      attributes: ['id', 'type','year','rate','method','categoryId','subcategoryId', 'createdAt', 'updatedAt'],
      where: {
        id: req.body.id
      }
    });
    res.json(depreciation);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputDepreciation = async (req, res) => {
  console.log(req.body)
  const { id, type,method, year, rate, categoryId, subcategoryId, } = req.body;
  try {
    const create = await Depreciation.create({
      type,year,rate,method, categoryId,subcategoryId
    });
    console.log(create)
    res.json({ data: create, msg: "yeay depreciation's in" });
  } catch (error) {
    if (id === Depreciation.id) {
      res.status(400).send(error);
    }
  }
};

const deleteDepreciation = async(req,res) => {
 await Promise.all(
    req.body.data.payload.map(async(payload)=> {
     await Depreciation.destroy({
        where: {
          id:payload.id
        }
      })
    })
  )
  return res.json(req.body.data.payload);
};

const editDepreciation = async(req, res) => {
   const depreciation =  await Depreciation.findOne({
    attributes: [
      "id",
      "type",
      "rate",
      'year',
      'method',
      'categoryId',
      'subcategoryId',
    ],
    where: {
      id: req.params.id
    }
  })
  depreciation.type = req.body.type
  depreciation.rate = req.body.rate
  depreciation.year = req.body.year
  depreciation.method = req.body.method
  depreciation.categoryId = req.body.categoryId,
  depreciation.subcategoryId = req.body.subcategoryId

  const save = await depreciation.save()
  res.status(200).json(save) 
}

module.exports = { getDepreciation, filterDepreciation, inputDepreciation, deleteDepreciation, editDepreciation};
