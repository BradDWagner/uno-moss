const router = require("express").Router();
const { User, Plant } = require("../../models");
const withAuth = require("../../utils/auth");
const uploadFile = require('../../utils/upload');

// Find all
router.get("/", (req, res) => {
  Plant.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPlants) => {
      res.json(dbPlants);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
// Find one
router.get("/:id", (req, res) => {
  Plant.findByPk(req.params.id, {})
    .then((dbPlant) => {
      res.json(dbPlant);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// Create Plant
router.post("/", withAuth, (req, res) => {
  Plant.create({
    ...req.body,
    user_id: req.session.user_id,
  })
    .then((newPlant) => {
      res.json(newPlant);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.post('/upload', uploadFile.single("image"), async (req, res) => {
  try {
    console.log(req.file)
    console.log(req.body)
    if(req.file == undefined) {
      console.log('no file')
      return res.status(403).send('You must select a file.');
    }
    console.log('yes file')
    console.log(req.body.plant_name)
    console.log(req.body.description)
    console.log(req.file.originalname)
    // const fileName = req.session.user.id + req.body.name
    const newPlant = await Plant.create({
      plant_name: req.body.plant_name,
      description: req.body.description,
      image: req.file.originalname,
      location: req.body.location,
      user_id: req.session.user.id
    })

    console.log(newPlant)
    res.status(201).json(newPlant)
  } catch (err) {
    res.status(400).json(err);
  }
})

// Update Plant
router.put("/:id", (req, res) => {
  Plant.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedPlant) => {
      res.json(updatedPlant);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// Delete a Plant
router.delete("/:id", (req, res) => {
  Plant.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delPlant) => {
      res.json(delPlant);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

module.exports = router;