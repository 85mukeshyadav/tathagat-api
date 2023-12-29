const express = require("express");

const { protect, authorize } = require("../../middleware/auth");
const {
	getQueInfo,
	getPackageInfo,
	getBookmarkQue,
	profileUpdate,
	getProfile,
	getBanner,
	addBanner,
	getForums,
	getTopics,
	getPosts
} = require("../../helper/helper");
const cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = (app, db) => {
	const { userQuestionsBookmark,sequelize, question, topic, chapter, users,wpForums,wpTopics,wpPosts } = db;

	app.get("/getposts", cors(), async (req, res) => {
		req.db = db;
		console.log(req.query)
		const posts = await getPosts(req);
		if (posts) {
			res.status(200).send({ status: 200, data: posts });
		} else {
			res.status(200).send({ status: 404, eroor: "posts not found!" });
		}
	});


};
