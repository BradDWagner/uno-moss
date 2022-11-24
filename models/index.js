const Plant = require('./Plant')
const User = require('./User');

User.hasMany(Plant, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Plant.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Plant };