const { resolve } = require("sequelize-cli/lib/helpers/path-helper");

module.exports = {
	getCourses: function (req) {
		return new Promise(async (resolve) => {
			const { courses } = req.db;
			await courses
				.findOne({ where: { courseId: req.params.courseCourseId } })
				.then(async (s) => {
					console.log(s);
					if (s) {
						resolve(s);
					} else {
						resolve({});
					}
				});
		});
	},

	getPackageTest: function (req) {
		return new Promise(async (resolve) => {
			const { sequelize } = req.db;
			let aqlQuery =
				"SELECT packageId, JSON_EXTRACT(TestList, '$[*].TestId') AS testIds FROM packages ";
			aqlQuery += " WHERE packageId = '" + packageId + "'";
			let result = await sequelize.query(aqlQuery, {
				type: sequelize.QueryTypes.SELECT,
			});
			//console.log("JSON_EXTRACT myyyyy ------- ", result);
			//console.log("JSON_EXTRACT END ------------------------------- ");
			let resultSet = [];
			if (typeof result != "undefined") {
				if (typeof result[0].testIds != "undefined") {
					resultSet = result[0].testIds;
				}
			}
			resolve(resultSet);
		});
	},

	getPackageUserID: function (req) {
		return new Promise(async (resolve) => {
			const { userPackages } = req.db;
			userPackages
				.findAll({
					where: {
						userEmailId: req.params.userId,
						status: 1,
						packagePackageId: req.params.PackageId,
					},
					order: [["updated_at", "DESC"]],
				})
				.then(async (userpackages) => {
					//console.log("userpackages --", userpackages[0]);
					if (!userpackages) {
						resolve(null);
					} else {
						resolve(userpackages);
					}
				});
		});
	},

	getPackageInfo: function (req) {
		return new Promise(async (resolve) => {
			const { packages } = req.db;
			packages
				.findOne({ where: { packageId: req.params.packageId } })
				.then((s) => {
					if (!s) {
						resolve(null);
					} else {
						resolve(s);
					}
				});
		});
	},

	getQueInfo: function (req) {
		return new Promise(async (resolve) => {
			const { questions } = req.db;
			questions
				.findOne({ where: { questionId: req.params.questionId } })
				.then((s) => {
					if (!s) {
						resolve(null);
					} else {
						resolve(s);
					}
				});
		});
	},

	getBookmarkQue: function (req) {
		return new Promise(async (resolve) => {
			const { userQuestionsBookmark } = req.db;
			console.log({
				testId: req.body.testId,
				userEmailId: req.body.userEmailId,
			});
			userQuestionsBookmark
				.findAll({
					where: {
						testId: req.body.testId,
						userEmailId: req.body.userEmailId,
						status: 1,
					},
				})
				.then(async (s) => {
					console.log(s);
					if (s) {
						resolve(s);
					} else {
						resolve({});
					}
				});
		});
	},

	profileUpdate: function (req) {
		return new Promise(async (resolve) => {
			const { users } = req.db;
			console.log(typeof req.body, req.params.userEmailId);
			users
				.update(req.body, { where: { email_Id: req.params.userEmailId } })
				.then((s) => {
					console.log(s);
					if (s) {
						resolve({
							user: {
								email_Id: req.params.userEmailId,
								...req.body,
							},
						});
					} else {
						resolve(null);
					}
				});
		});
	},

	getProfile: function (req) {
		return new Promise(async (resolve) => {
			const { users } = req.db;
			users
				.findOne({ where: { email_Id: req.params.userEmailId } })
				.then((s) => {
					if (!s) {
						resolve(null);
					} else {
						resolve(s);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	},

	getBanner: function (req) {
		return new Promise(async (resolve) => {
			const { banner } = req.db;

			const { Op } = require('sequelize');

			const currentDate = new Date();


			banner
				.findAll({
					where: {
						expiry_date: {
							[Op.gt]: currentDate,
						},
					}
				})
				.then((s) => {
					if (!s) {
						resolve(null);
					} else {
						resolve(s);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	},

	addBanner: function (req) {
		return new Promise(async (resolve) => {
			const { banner } = req.db;
			banner.create({
				title: req.body.title,
				description: req.body.description,
				image_url: req.body.imagepath,
				status: 1,
				expiry_date: req.body.expiry_date

			})
				.then((s) => {
					if (s) {
						resolve({ status: 200, message: "done" });
					}
				});
		});
	},

	addReferral: function (req) {
		return new Promise(async (resolve) => {
			const { referral } = req.db;
			referral.create({
				userEmailId: req.body.userEmailId,
				referee_1_name: req.body.referee_1_name,
				referee_1_phone: req.body.referee_1_phone,
				referee_2_name: req.body.referee_2_name,
				referee_2_phone: req.body.referee_2_phone,
			}).then((s) => {
				if (s) {
					resolve({ status: 200, message: "done" });
				}
			});
		})
	},

	getReferral: function (req) {
		return new Promise(async (resolve) => {
			const { referral } = req.db;
			referral.findOne({
				where: {
					userEmailId: req.query.userEmailId
				}
			}).then((result) => {
				resolve(result);
			}).catch((err) => {
				resolve(null);
			})
		});
	},


	getForums: function (req) {
		return new Promise(async (resolve) => {
			const { wpForums } = req.db;
			wpForums
				.findAll({ where: { "parentid": parseInt(req.query.parentid) } })
				.then((s) => {
					if (!s) {
						resolve(null);
					} else {
						console.log(s)
						resolve(s);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	},


	getTopics: function (req) {
		return new Promise(async (resolve) => {
			const { wpTopics } = req.db;
			wpTopics
				.findAll({ where: { "forumid": parseInt(req.query.forumid) } })
				.then((s) => {
					if (!s) {
						resolve(null);
					} else {
						console.log(s)
						resolve(s);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	},


	getPosts: function (req) {
		return new Promise(async (resolve) => {
			const { wpPosts ,wpUser} = req.db;

			const offset = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.pageSize);
			const limit = parseInt(req.query.pageSize);


			wpPosts
				.findAll({ include: [
					{
					  model: wpUser,
					  attributes: ['user_login', 'user_email','user_nicename','display_name'], // Select specific columns from WpUser
					},
				  ],
					where: { "topicid": parseInt(req.query.topicid) },
					offset,
					limit, })
				.then((s) => {
					if (!s) {
						resolve(null);
					} else {
						console.log(s)
						resolve(s);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	},


	getBlog: function (req) {
		return new Promise(async (resolve) => {
			const { wpBlog,wpUser } = req.db;

			const offset = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.pageSize);
			const limit = parseInt(req.query.pageSize);

			wpBlog
				.findAll({ include: [
					{
					  model: wpUser,
					  attributes: ['user_login', 'user_email','user_nicename','display_name'], // Select specific columns from WpUser
					},
				  ],
					where: { "post_status": "publish","ping_status":"open"} ,
					offset,
					limit,
					order: [["ID", "DESC"]],
				})
				.then((s) => {
					if (!s) {
						resolve(null);
					} else {
						console.log(s)
						resolve(s);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
	},


	addpost: function (req) {
		return new Promise(async (resolve) => {
			const { wpPosts ,wpUser} = req.db;

		
			try {
				// Create a new post
				const newWpforoPost = await wpPosts.create({
					parentid: req.body.parentid,
					forumid: req.body.forumid, // Replace with the actual forum ID
					topicid: req.body.topicid, // Replace with the actual topic ID
					userid: req.body.userid, // Replace with the actual user ID
					title: req.body.title,
					body: req.body.body,
					likes: 0,
					votes: 0,
					is_answer: 0,
					is_first_post: 0,
					status: 0,
					name: "",
					email: '',
					private: 0,
					root: null,
				  });
			  
			
				console.log('New post added:', newWpforoPost);
				resolve(newWpforoPost)

			  } catch (error) {
				console.error('Error adding post:', error);
				resolve(null)
			  }

		});
	},

};


