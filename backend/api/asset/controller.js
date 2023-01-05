/* eslint-disable consistent-return */
/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const PdfPrinter = require('pdfmake');
const {
  Assets, Category, SubCategory, Dapartment, Section, Currency,
} = require('./relations');

const fonts = {
  Roboto: {
    normal: '../frontend/static/font/Roboto-Regular.ttf',
    bold: '../frontend/static/font/Roboto-Medium.ttf',
    bolditalics: '../frontend/static/font/Roboto-MediumItalic.ttf',
  },
};
const printer = new PdfPrinter(fonts);

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
        'updatedAt',
      ],
      include: [{
        model: Category,
        attributes: ['name'],
      }, {
        model: SubCategory,
        attributes: ['name'],
      },
      {
        model: Dapartment,
        attributes: ['name'],
      },
      {
        model: Section,
        attributes: ['name'],
      },
      {
        model: Currency,
        attributes: ['name'],
      },
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

const deleteAssets = async (req, res) => {
  await Promise.all(
    req.body.data.payload.map(async (payload) => {
      await Assets.destroy({
        where: {
          id: payload.id,
        },
      });
    }),
  );
  return res.json(req.body.data.payload);
};

const editAssets = async (req, res) => {
  const assets = await Assets.findOne({
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
    ],
    where: {
      id: req.params.id,
    },
  });
  assets.name = req.body.name;
  assets.brandModel = req.body.brandModel;
  assets.categoryId = req.body.categoryId;
  assets.subcategoryId = req.body.subcategoryId;
  assets.condition = req.body.condition;
  assets.status = req.body.status;
  assets.dapartmentId = req.body.dapartmentId;
  assets.sectionId = req.body.sectionId;
  assets.po = req.body.po;
  assets.date = req.body.date;
  assets.qty = req.body.qty;
  assets.currencyId = req.body.currencyId;
  assets.price = req.body.price;
  assets.exchange = req.body.exchange;
  assets.type = req.body.type;
  assets.method = req.body.method;
  assets.rate = req.body.rate;
  assets.year = req.body.year;

  const save = await assets.save();
  res.status(200).json(save);
};

const generatePdf = async (req, res, next) => {
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
        'updatedAt',
      ],
      include: [{
        model: Category,
        attributes: ['name'],
      }, {
        model: SubCategory,
        attributes: ['name'],
      },
      {
        model: Dapartment,
        attributes: ['name'],
      },
      {
        model: Section,
        attributes: ['name'],
      },
      {
        model: Currency,
        attributes: ['name'],
      },
      ],
    });

    const tbl = [
      ['No', 'Category', 'Sub Category', 'Asset Name'],
    ];

    assets.map((val, index) => {
      tbl.push([
        { text: (index + 1), alignment: 'center' },
        { text: val.category.name },
        { text: val.subcategory.name },
        { text: val.name },
      ]);

      return true;
    });

    const docDefinition = {
      content: [
        { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
        'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            body: tbl,
          },
        },
      ],
      styles: {
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    return new Promise((resolve) => {
      const pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream('../frontend/static/report/asset.pdf'));
      pdfDoc.on('end', () => {
        res.status(200).json({ status: 1 });
      });
      pdfDoc.end();
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAssets,
  inputAssets,
  deleteAssets,
  editAssets,
  generatePdf,
};
