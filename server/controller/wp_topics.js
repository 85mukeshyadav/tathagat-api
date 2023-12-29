const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    const attributes = {
        topicid: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        forumid: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        first_postid: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        userid: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: '0000-00-00 00:00:00',
        },
        modified: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: '0000-00-00 00:00:00',
        },
        last_post: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        posts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        votes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        answers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        views: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        meta_key: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        meta_desc: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        type: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        solved: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        closed: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        has_attach: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        private: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        prefix: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: '',
        },
        tags: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
    }

    const options = {
        tableName: 'wp_wpforo_topics',
        comment: '',
        indexes: [],
    };
    const WPTopicsModel = sequelize.define('wp_wpforo_topics', attributes, options);
    return WPTopicsModel;
};

