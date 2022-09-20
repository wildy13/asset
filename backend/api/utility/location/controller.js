const Location = require('./model')

const getLocation = async (req, res) => {
  try {
    const location = await Location.findAll({
      attributes: ['id', 'name', 'createdAt', 'updatedAt'],
    });
    res.json(location);
  } catch (error) {
    res.status(400).send(error);
  }
};

const inputLocation = async (req, res) => {
  const { id, name } = req.body;
  try {
    const create = await Location.create({
      name,
    });
    res.json({ data: create, msg: "yeay location's in" });
  } catch (error) {
    console.log(error)
    if (id === Location.id) {
      res.status(400).send(error);
    }
  }
};

const deleteLocation = async(req,res) => {
 await Promise.all(
    req.body.data.payload.map(async(payload)=> {
     await Location.destroy({
        where: {
          id:payload.id
        }
      })
    })
  )
  return res.json(req.body.data.payload);
};

const editLocation = async(req, res) => {
   const location =  await Location.findOne({
    attributes: [
      "id",
      "name",
    ],
    where: {
      id: req.params.id
    }
  })
  location.name = req.body.name

  const save = await location.save()
  res.status(200).json(save) 
}

module.exports = { getLocation, inputLocation, deleteLocation, editLocation};
