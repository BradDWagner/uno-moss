const express = require("express");
const router = express.Router();
const withAuth = require("../utils/auth");
const { User, Plant } = require("../models");

// route to login page. If already logged in send to homepage
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/home", {user_id: req.session.user.id, });
  }
  res.render("login");
});

// Route to newUser template
router.get('/newUser', async (req, res) => {
  res.render('newUser', {
    logged_in: req.session.logged_in,
     user_id: req.session.user.id,
    })
})

// Route to home page with list of all plants
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

// Route to create template
router.get("/grow", withAuth, (req, res) => {
  res.render("create", {
    logged_in: req.session.logged_in,
    user_id: req.session.user.id,
  });
});

// Find a Plant post by ID
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
    res.render("post", {
      plant,
      logged_in: req.session.logged_in,
      user_id: req.session.user.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/profile/:id", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the ID paramater
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Plant }],
    });
    const user = userData.get({ plain: true });
    res.render("profile", {
      user,
      logged_in: true,
      user_id: req.session.user.id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;

