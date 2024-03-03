const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    const attributes = {

        term_taxonomy_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        term_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        taxonomy: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT('long'),
        },
        parent: {
            type: DataTypes.BIGINT.UNSIGNED,
        },
        count: {
            type: DataTypes.BIGINT,
        }

    }

    const options = {
        tableName: 'wp_term_taxonomy',
        comment: '',
        indexes: [],
    };
    const WpTermTaxonomy = sequelize.define('wp_term_taxonomy', attributes, options);
    return WpTermTaxonomy;
};

