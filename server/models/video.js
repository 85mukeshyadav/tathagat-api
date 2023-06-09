const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const attributes = {
    videoId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: 'videoId',
    },
    videoPath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      unique: true,
      autoIncrement: false,
      comment: null,
      field: 'videoPath',
    },

    videoname: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      unique: true,
      autoIncrement: false,
      comment: null,
      field: 'videoname',
    },
    videodescription: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'videodescription',
    },


    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'created_at',
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'updated_at',
    },
  };
  const options = {
    tableName: 'video',
    comment: '',
    indexes: [],
  };
  const VideoModel = sequelize.define('video', attributes, options);
  return VideoModel;
};
