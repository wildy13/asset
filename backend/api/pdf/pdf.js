/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const path = require('path');
const PdfPrinter = require('pdfmake');
const {
  Assets,
  Category,
  SubCategory,
  Dapartment,
  Section,
  Currency,
} = require('../asset/relations');

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
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
        {
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

const generatePdf = async (req, res, next) => {
  try {
    const image = path.join(__dirname, 'image', 'logo.jpg');
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
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
        {
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
    /* tabel column */
    const tbl = [
      [
        { text: 'No', bold: true },
        { text: 'Name', bold: true },
        { text: 'Category', bold: true },
        { text: 'Sub Category', bold: true },
        { text: 'Model', bold: true },
        { text: 'Dapartment', bold: true },
        { text: 'Section', bold: true },
        { text: 'Condition', bold: true },
        { text: 'Status', bold: true },
      ],
    ];
    /* tabel text */
    assets.map((val, index) => {
      tbl.push([
        { text: index + 1, alignment: 'center' },
        {
          text: val.name,
          alignment: 'center',
          normal: true,
          fontSize: 12,
        },
        {
          text: val.category.name,
          alignment: 'center',
          normal: true,
          fontSize: 12,
        },
        {
          text: val.subcategory.name,
          alignment: 'center',
          normal: true,
          fontSize: 12,
        },
        {
          text: val.brandModel,
          alignment: 'center',
          normal: true,
          fontSize: 12,
        },
        {
          text: val.dapartment.name,
          alignment: 'center',
          normal: true,
          fontSize: 12,
        },
        {
          text: val.section.name,
          alignment: 'center',
          normal: true,
          fontSize: 12,
        },
        {
          text: val.condition,
          alignment: 'center',
          normal: true,
          fontSize: 12,
        },
        {
          text: val.status,
          alignment: 'center',
          normal: true,
          fontSize: 12,
        },
      ]);

      return false;
    });

    const docDefinition = {
      content: [
        /* tabel header */
        {
          margin: [1.18, 1.18, 0.99, 0.99],
          table: {
            widths: [120, 380],
            body: [
              [
                {
                  image,
                  width: '120',
                  margin: [0, 0, 0, 5],
                  border: [false, false, false, true],
                  rowSpan: 5,
                },
                {
                  text: 'PT Labtech Penta International',
                  margin: [0, 0, 0, 0],
                  fontSize: 12,
                  bold: true,
                  alignment: 'right',
                  border: [false, false, false, false],
                },
              ],
              [
                '',
                {
                  text: 'Kawasan Industri Sekupang, Kav 34, Sekupang, Riau, Indonesia 29422.',
                  margin: [0, -5, 0, 0],
                  fontSize: 10,
                  alignment: 'right',
                  border: [false, false, false, false],
                },
              ],
              [
                '',
                {
                  text: '0778-321330',
                  margin: [0, -5, 0, 0],
                  fontSize: 10,
                  alignment: 'right',
                  border: [false, false, false, false],
                },
              ],
              [
                '',
                {
                  text: 'example@labtech.org',
                  margin: [0, -5, 0, 0],
                  fontSize: 10,
                  alignment: 'right',
                  border: [false, false, false, false],
                },
              ],
              [
                '',
                {
                  text: 'www.labtech.org',
                  margin: [0, -5, 0, 5],
                  fontSize: 10,
                  alignment: 'right',
                  border: [false, false, false, true],
                },
              ],
            ],
          },
        },
        /* tabel body */
        {
          text: 'Asset Company Report',
          bold: true,
          margin: [0, 10, 0, 5],
          alignment: 'center',
          fontSize: 14,
        },
        {
          style: 'tableHeader',
          table: {
            body: tbl,
          },
          layout: {
            fillColor(rowIndex, node, columnIndex) {
              return rowIndex === 0 ? '#CCCCCC' : null;
            },
          },
        },
      ],
      styles: {
        subheader: {
          fontSize: 16,
          bold: false,
          margin: [5, 2, 10, 20], // margin: [left, top, right, bottom]
        },
        tableHeader: {
          margin: [0, 10, 0, 0],
          alignment: 'center',
          fontSize: 12,
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
        anotherStyle: {
          italics: false,
          alignment: 'center',
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

module.exports = { generatePdf };
