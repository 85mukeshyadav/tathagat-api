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
	getForums
} = require("../../helper/helper");
const cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = (app, db) => {
	const { userQuestionsBookmark,sequelize, question, topic, chapter, users,wpForums } = db;

	app.get("/forums", cors(), async (req, res) => {
		req.db = db;
		console.log(req.query)
		const forums = await getForums(req);
		if (forums) {
			res.status(200).send({ status: 200, data: forums });
		} else {
			res.status(200).send({ status: 404, eroor: "forums not found!" });
		}
	});

};
