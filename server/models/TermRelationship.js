// models/TermRelationship.js
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    const attributes = {
        object_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        term_taxonomy_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        term_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

    }

    const options = {
        tableName: 'wp_term_relationships',
        comment: '',
        indexes: [],
    };
    const TermRelationship = sequelize.define('wp_term_relationships', attributes, options);
    return TermRelationship;
};
