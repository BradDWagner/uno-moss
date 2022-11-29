const express = require("express");
const router = express.Router();
const { User, Plant } = require("../../models");
const bcrypt = require("bcrypt");

// Find all users
router.get("/", (req, res) => {
  User.findAll({})
    .then((dbUsers) => {
      console.log(dbUsers);
      res.json(dbUsers);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// Find a single user
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {})
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// Create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.user ={
      id: userData.id,
      user_name: userData.user_name,
    };
    req.session.logged_in = true;
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Login user
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: req.body.username,
      },
    });
    if (!userData) {
      return res.status(400).json({ msg: "wrong login credentials" });
    }
    if (bcrypt.compareSync(req.body.password, userData.password)) {
      req.session.user = {
        id: userData.id,
        user_name: userData.user_name,
      };
      const cleanData = userData.get({ plain: true });
      console.log(cleanData);
      res.render("homepage", cleanData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  }
});

// Update user
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// Delete a user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delUser) => {
      res.json(delUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

module.exports = router;

