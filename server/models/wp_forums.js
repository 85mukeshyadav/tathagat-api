const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

    const attributes = {
        forumid: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        parentid: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        icon: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        last_topicid: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        last_postid: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        last_userid: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        last_post_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: '0000-00-00 00:00:00',
        },
        topics: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        posts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        permissions: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        meta_key: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        meta_desc: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        is_cat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        layout: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        order: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        color: {
            type: DataTypes.STRING(7),
            allowNull: false,
            defaultValue: '',
        },
        cover: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        cover_height: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 150,
        },
    }

    const options = {
        tableName: 'wp_wpforo_forums',
        comment: '',
        indexes: [],
    };
    const WPForumsModel = sequelize.define('wp_wpforo_forums', attributes, options);
    return WPForumsModel;
};

