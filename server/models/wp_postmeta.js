const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    const attributes = {

        meta_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        meta_key: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        meta_value: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }

    const options = {
        tableName: 'wp_postmeta',
        comment: '',
        indexes: [],
    };
    const WPPostMeta = sequelize.define('wp_postmeta', attributes, options);
    return WPPostMeta;
};

