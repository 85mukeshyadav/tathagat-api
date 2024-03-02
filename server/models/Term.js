// models/TermRelationship.js
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    const attributes = {
        term_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '',
        },
        slug: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '',
        },
        term_group: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0,
        },
        category_type: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: 0,
        },
        course_type: {
            type: DataTypes.STRING(200),
            allowNull: false,
            defaultValue: '',
        },

    }

    const options = {
        tableName: 'wp_terms',
        comment: '',
        indexes: [],
    };
    const Term = sequelize.define('wp_terms', attributes, options);
    return Term;
};
