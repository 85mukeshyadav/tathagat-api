const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    userEmailId: {
      type: DataTypes.STRING(245),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "userEmailId",
      isEmail: { msg: 'not a valid email' },
      unique: {
        args: true,
        msg: 'email ad already in use!',
      },
    },
    referee_1_name: {
      type: DataTypes.STRING(245),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "referee_1_name"
    },
    referee_1_phone: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "referee_1_phone"
    },
    referee_2_name: {
      type: DataTypes.STRING(245),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "referee_2_name"
    },
    referee_2_phone: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "referee_2_phone"
    },
  };
    const options = {
    tableName: 'referral',
    comment: '',
    indexes: [],
  };
  const RefferalModel = sequelize.define("referral", attributes, options);
  return RefferalModel;
};