const {
  DataTypes
} = require('sequelize');


module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    title  : {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "title"
    },

    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
       primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "description"
    },
    image_url : {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "image_url"
    },

    status:{
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "(1=>Bookmark, 0=>NotBookmark)",
      field: "status"
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "updated_at"
    },
   

    expiry_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "expiry_date"
    },
   

    slug: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "slug"
    },
   

    amount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "amount"
    },
   

    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "url"
    },
   

  };


  const options = {
    tableName: 'banner',
    comment: '',
    indexes: [],
  };
  const banner = sequelize.define("banner", attributes,options);
  return banner;
};