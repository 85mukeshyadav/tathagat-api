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
	getPosts,
	getBlog, getBlogCategory
} = require("../../helper/helper");
const cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = (app, db) => {
	const { userQuestionsBookmark,sequelize, question, topic, chapter, users,wpForums,wpTopics,wpPosts,wpBlog,wpUser } = db;

	app.get("/getblog", cors(), async (req, res) => {
		req.db = db;
		console.log(req.query)
		const blog = await getBlog(req);
		req.params.blog = "blog"
		const getCategory = await getBlogCategory(req);
		if (blog) {
			res.status(200).send({ status: 200, data: blog, blog_categories:getCategory });
		} else {
			res.status(200).send({ status: 404, eroor: "posts not found!" });
		}
	});


};
