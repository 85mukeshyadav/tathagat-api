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
	addpost, getPostAttachment
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
			var index = 0;
			for(var post of posts) {

				// Regular expression to match the number inside [attach] tags
				const regex = /\[attach\](\d+)\[\/attach\]/;
				const match = post.body.match(regex);

				if (match && match.length > 1) {
					const attachmentNumber = match[1];
					req.params.postId = attachmentNumber;
					var postImage = await getPostAttachment(req)
					if(postImage) {
						posts[index]["attachment"] = postImage.guid
					}

				} else {
					console.log("No attachment number found.");
				}

				index++

			}


			res.status(200).send({ status: 200, data: posts });
		} else {
			res.status(200).send({ status: 404, eroor: "posts not found!" });
		}
	});


	app.post("/addposts", cors(), async (req, res) => {
		req.db = db;
		console.log(req.body)
		const posts = await addpost(req);
		if (posts) {
			res.status(200).send({ status: 200, data: posts,message:"Successfully added" });
		} else {
			res.status(200).send({ status: 404, eroor: "Try Again " });
		}
	});


};
