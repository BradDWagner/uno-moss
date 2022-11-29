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

router.get("/home", async (req, res) => {
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
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// Use withAuth middleware to prevent access to route
// router.get("/profile", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: Plant }],
//     });
//     const user = userData.get({ plain: true });
//     console.log(user);
//     res.render("profile", {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/grow', async (req, res) => {
  res.render('create')
})

module.exports = router;
