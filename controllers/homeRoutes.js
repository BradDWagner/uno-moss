const express = require("express");
const router = express.Router();
const withAuth = require("../utils/auth");
const { User, Plant } = require("../models");
// const { findAll, findByPk } = require("../models/Plant");

router.get("/", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/home");
  }
  res.render("login");
});

router.get('/newUser', async (req, res) => {
  res.render('newUser', {logged_in: req.session.logged_in})
})

router.get("/home", withAuth, async (req, res) => {
  try {
    // Get all plants and JOIN with user data
    const plantData = await Plant.findAll({
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });
    // Serialize data so the template can read it
    const plantList = plantData.map((plantList) =>
      plantList.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render("homepage", {
      plantList,
      logged_in: req.session.logged_in,
      user_id: req.session.user.id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/grow", withAuth, (req, res) => {
  res.render("create", {
    logged_in: req.session.logged_in,
  });
});

router.get("/plant/:id", withAuth, async (req, res) => {
  try {
    const plantData = await Plant.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });
    const plant = plantData.get({ plain: true })
    console.log(plant)
    res.render("post", {
      plant,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile/:id", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Plant }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;

