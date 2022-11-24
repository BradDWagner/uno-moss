const sequelize = require('../config/connection');
const{ User, Plant } = require('../models');

const userSeedData = require('./userData.json');
const plantSeedData = require('./plantData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true});

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });

    const plants = await Plant.bulkCreate(plantSeedData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();