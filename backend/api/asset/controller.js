const Assets = require('./model')

const getAssets = async (req, res) => {
  try {
    const assets = await Assets.findAll({
      attributes: [
        'id', 
        'name',
        'brandModel', 
        'categoryId', 
        'subcategoryId', 
        'condition', 
        'status', 
        'dapartmentId', 
        'sectionId', 
        'po',
        'date', 
        'qty', 
        'currencyId', 
        'price', 
        'exchange', 
        'type', 
        'method', 
        'rate', 
        'year', 
        'createdAt', 
        'updatedAt'
    ],
    });
    res.json(assets);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputAssets = async (req, res) => {
  const { 
    id,
    name, 
    brandModel,
    categoryId,
    subcategoryId, 
    condition, 
    status, 
    dapartmentId, 
    sectionId, 
    po,
    date, 
    qty, 
    currencyId, 
    price, 
    exchange, 
    type, 
    method, 
    rate, 
    year, 
} = req.body;
  try {
    const create = await Assets.create({
      name,    
      brandModel,
      categoryId,
      subcategoryId, 
      condition, 
      status, 
      dapartmentId, 
      sectionId, 
      po,
      date, 
      qty, 
      currencyId, 
      price, 
      exchange, 
      type, 
      method, 
      rate, 
      year, 
    });
    res.json({ data: create, msg: "yeay Assets's in" });
  } catch (error) {
    if (id === Assets.id) {
      res.status(400).send(error);
    }
  }
};

const deleteAssets = async(req,res) => {
 await Promise.all(
    req.body.data.payload.map(async(payload)=> {
     await Assets.destroy({
        where: {
          id:payload.id
        }
      })
    })
  )
  return res.json(req.body.data.payload);
};

const editAssets = async(req, res) => {
   const assets =  await Assets.findOne({
    attributes: [
      "id",
      "name",
      'brandModel', 
      'categoryId', 
      'subcategoryId', 
      'condition', 
      'status', 
      'dapartmentId', 
      'sectionId', 
      'po',
      'date', 
      'qty', 
      'currencyId', 
      'price', 
      'exchange', 
      'type', 
      'method', 
      'rate', 
      'year', 
    ],
    where: {
      id: req.params.id
    }
  })
  assets.name = req.body.name
  assets.brandModel = req.body.brandModel
  assets.categoryId = req.body.categoryId
  assets.subcategoryId = req.body.subcategoryId
  assets.condition = req.body.condition
  assets.status = req.body.status
  assets.dapartmentId = req.body.dapartmentId
  assets.sectionId = req.body.sectionId
  assets.po = req.body.po
  assets.date = req.body.date
  assets.qty = req.body.qty
  assets.currencyId = req.body.currencyId
  assets.price = req.body.price,
  assets.exchange = req.body.exchange
  assets.type = req.body.type
  assets.method = req.body.method
  assets.rate = req.body.rate
  assets.year = req.body.year

  const save = await assets.save()
  res.status(200).json(save) 
}

module.exports = { getAssets, inputAssets, deleteAssets, editAssets};
