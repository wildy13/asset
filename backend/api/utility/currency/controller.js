const Currency = require('./model');

const getCurrency = async (req, res) => {
  try {
    const currency = await Currency.findAll({
      attributes: ['id', 'name', 'currencyCode', 'currencySymbol', 'createdAt', 'updatedAt'],
    });
    res.json(currency);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputCurrency = async (req, res) => {
  const {
    id, name, currencyCode, currencySymbol,
  } = req.body;
  try {
    const create = await Currency.create({
      name, currencyCode, currencySymbol,
    });
    res.json({ data: create, msg: "yeay currency's in" });
  } catch (error) {
    if (id === Currency.id) {
      res.status(400).send(error);
    }
  }
};

const deleteCurrency = async (req, res) => {
  await Promise.all(
    req.body.data.payload.map(async (payload) => {
      await Currency.destroy({
        where: {
          id: payload.id,
        },
      });
    }),
  );
  return res.json(req.body.data.payload);
};

const editCurrency = async (req, res) => {
  const currency = await Currency.findOne({
    attributes: [
      'id',
      'name',
      'currencyCode',
      'currencySymbol',
    ],
    where: {
      id: req.params.id,
    },
  });
  currency.name = req.body.name;
  currency.currencySymbol = req.body.currencySymbol;
  currency.currencyCode = req.body.currencyCode;

  const save = await currency.save();
  res.status(200).json(save);
};

module.exports = {
  getCurrency, inputCurrency, deleteCurrency, editCurrency,
};
