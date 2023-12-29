const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    const attributes = {

        ID: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
          },
          user_login: {
            type: DataTypes.STRING(60),
            allowNull: false,
            defaultValue: '',
          },
          user_pass: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
          },
          user_nicename: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
          },
          user_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
          },
          user_url: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
          },
          user_registered: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: '0000-00-00 00:00:00',
          },
          user_activation_key: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: '',
          },
          user_status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          display_name: {
            type: DataTypes.STRING(250),
            allowNull: false,
            defaultValue: '',
          },
        }
    
    const options = {
        tableName: 'wp_users',
        comment: '',
        indexes: [],
    };
    const WPBlogModel = sequelize.define('wp_users', attributes, options);
    return WPBlogModel;
};

