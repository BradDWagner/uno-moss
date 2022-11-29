const express = require("express");
const router = express.Router();
const withAuth = require("../utils/auth");
const { User, Plant } = require("../models");

router.get("/", (req, res) => {
  if (req.session.user) {
    return res.redirect("/home");
  }
  res.render("login");
});

router.get("/home", withAuth, async (req, res) => {
  try {
    // Get all plants and JOIN with user data
    const plantData = await Plant.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
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
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/grow", (req, res) => {
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
    res.render("post", {
      plantData,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
