const express = require("express");

const { protect, authorize } = require("../../middleware/auth");
const {

	getBlog, getLessons, getQuizzes
} = require("../../helper/helper");
const cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = (app, db) => {
	const { userQuestionsBookmark,sequelize, question, topic, chapter, users,wpForums,wpTopics,wpPosts,wpBlog,wpUser } = db;

	app.get("/getlessons", cors(), async (req, res) => {
		req.db = db;
		console.log(req.query)
		const lessons = await getLessons(req);
		if (lessons) {
			res.status(200).send({ status: 200, data: lessons });
		} else {
			res.status(200).send({ status: 404, eroor: "lessons not found!" });
		}
	});


	app.get("/getquizzes", cors(), async (req, res) => {
		req.db = db;
		console.log(req.query)
		const quizzes = await getQuizzes(req);
		if (quizzes) {
			res.status(200).send({ status: 200, data: quizzes });
		} else {
			res.status(200).send({ status: 404, eroor: "quizzes not found!" });
		}
	});


};
