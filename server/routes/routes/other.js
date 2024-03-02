const express = require("express");

const { protect, authorize } = require("../../middleware/auth");
const {

	getBlog, getLessons, getQuizzes, getVideos, sendmail
} = require("../../helper/helper");
const cors = require("cors");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = (app, db) => {
	const { userQuestionsBookmark,sequelize, question, topic, chapter, users,wpForums,wpTopics,wpPosts,wpBlog,wpUser ,WPPostMeta} = db;

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


	app.get("/getvideos", cors(), async (req, res) => {
		req.db = db;
		console.log(req.query)
		const videos = await getVideos(req);
		if (videos) {
			var videoFree = [];
			var videoPaid = []
			for(var price of videos) {

				// Find the object where meta_key is 'stm_price'
				const priceMetaObject = price.wp_postmeta.find(metaObject => metaObject.meta_key === 'price');
				if (priceMetaObject) {
					console.log(priceMetaObject); // Output the found object
					if(priceMetaObject.meta_value != "0" && priceMetaObject.meta_value != "") {
						videoPaid.push(price)
					}else {
						videoFree.push(price)
					}

				} else {
					console.log('No object found with meta_key: price');
					videoFree.push(price)
				}


			}
			if(req.query.price === "free"){
				res.status(200).send({ status: 200, data: videoFree });
			}else {
				res.status(200).send({ status: 200, data: videoPaid });
			}
		} else {
			res.status(200).send({ status: 404, eroor: "videos not found!" });
		}
	});

// Route to send email
	app.post("/sendmail", cors() ,async (req, res) => {
		try {
			// Setup email data
			const mailOptions = {
				from: 'support@prepcha.com',
				to: req.body.to,
				subject: req.body.subject,
				text: req.body.text
			};

			// Send email
			const info = await sendmail(mailOptions);
			console.log('Email sent successfully:', info);
			res.send('Email sent successfully');
		} catch (error) {
			console.error('Error occurred while sending email:', error);
			res.status(500).send('Error occurred while sending email');
		}
	});



};
