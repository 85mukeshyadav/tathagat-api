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
	getTopics
} = require("../../helper/helper");
const cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = (app, db) => {
	const { userQuestionsBookmark,sequelize, question, topic, chapter, users,wpForums,wpTopics } = db;

	app.get("/gettopics", cors(), async (req, res) => {
		req.db = db;
		console.log(req.query)
		const topics = await getTopics(req);
		if (topics) {
			res.status(200).send({ status: 200, data: topics });
		} else {
			res.status(200).send({ status: 404, eroor: "topics not found!" });
		}
	});


};
