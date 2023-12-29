const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');



module.exports = (sequelize) => {

    const attributes = {
        postid: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        parentid: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        forumid: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        topicid: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        userid: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            defaultValue: null,
        },
        body: {
            type: DataTypes.TEXT,
            defaultValue: null,
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
        likes: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        votes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        is_answer: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        is_first_post: {
            type: DataTypes.TINYINT.UNSIGNED,
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
        private: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        root: {
            type: DataTypes.BIGINT.UNSIGNED,
            defaultValue: null,
        },
    }


    const options = {
        tableName: 'wp_wpforo_posts',
        comment: '',
        indexes: [],
    };
    const WPPostsModel = sequelize.define('wp_wpforo_posts', attributes, options);
    return WPPostsModel;
};

