const { resolve } = require("sequelize-cli/lib/helpers/path-helper");
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');


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
			const { wpBlog,wpUser,Term,WpTermTaxonomy, } = req.db;

			const offset = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.pageSize);
			const limit = parseInt(req.query.pageSize);

			const whereCondition = {};

			if (req.query.term_id) {
				whereCondition.term_id = req.query.term_id;
			} else {
				whereCondition.category_type = 'blog';
			}

			if(req.query.course_type){
				whereCondition.course_type = req.query.course_type
			}

			wpBlog
				.findAll({ include: [
					{
					  model: wpUser,
					  attributes: ['user_login', 'user_email','user_nicename','display_name'], // Select specific columns from WpUser
					}, {
							model: Term, // Include the Term model
							attributes: ['term_id','name','slug','term_group','category_type','course_type'], // Specify the attribute(s) you want to select
							through: { attributes: [] },
							where: whereCondition,// Exclude attributes from the join table (wp_term_relationships)
						}
				  ],
					where: {"post_status":"publish"} ,
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

	getPostAttachment: function (req) {
		return new Promise(async (resolve) => {
			const { wpBlog } = req.db;

			try {
				const postId = req.params.postId;
				const post = await wpBlog.findOne({
					where: {
						ID: postId,
						post_type: 'attachment',
					},
				});
				if (post) {
					resolve(post)
				} else {
					console.log('Post not found');
					resolve(null)
				}
			} catch (error) {
				console.error('Error retrieving post:', error);
				resolve(null)
			}

		});
	},

	getLessons: function (req) {
		return new Promise(async (resolve) => {
			const { wpBlog,wpUser,Term,WPPostMeta,WpTermTaxonomy, } = req.db;

			const offset = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.pageSize);
			const limit = parseInt(req.query.pageSize);


			const whereCondition = {};
			whereCondition.category_type = 'lesson';
			if(req.query.course_type){
				whereCondition.course_type = req.query.course_type
			}


			wpBlog
				.findAll({ include: [
						{
							model: wpUser,
							attributes: ['user_login', 'user_email','user_nicename','display_name'], // Select specific columns from WpUser
						}, {
							model: Term, // Include the Term model
							attributes: ['term_id','name','slug','term_group','category_type','course_type'], // Specify the attribute(s) you want to select
							where: whereCondition,
							through: { attributes: [] }, // Exclude attributes from the join table (wp_term_relationships)
							include: {
								model: WpTermTaxonomy, // Include the Term model for WpTermTaxonomy
								attributes: [], // If you don't want to select any attributes from Term
								attributes: ['term_taxonomy_id','term_id','taxonomy','description','parent','count'], // Specify the attribute(s) you want to select

							}
						}
					],
					where: {"post_status":"publish"} ,
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

	getQuizzes: function (req) {
		return new Promise(async (resolve) => {
			const { wpBlog,wpUser,Term,WPPostMeta, WpTermTaxonomy} = req.db;

			const offset = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.pageSize);
			const limit = parseInt(req.query.pageSize);

			const whereCondition = {};
			whereCondition.category_type = 'quiz';
			if(req.query.course_type){
				whereCondition.course_type = req.query.course_type
			}

			wpBlog
				.findAll({ include: [
						{
							model: wpUser,
							attributes: ['user_login', 'user_email','user_nicename','display_name'], // Select specific columns from WpUser
						}, {
							model: Term, // Include the Term model
							attributes: ['term_id','name','slug','term_group','category_type','course_type'], // Specify the attribute(s) you want to select
							where: whereCondition,
							include: {
								model: WpTermTaxonomy, // Include the Term model for WpTermTaxonomy
								attributes: [], // If you don't want to select any attributes from Term
								attributes: ['term_taxonomy_id','term_id','taxonomy','description','parent','count'], // Specify the attribute(s) you want to select

							},
						}
					],
					where: {"post_status":"publish"} ,
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

	getVideos: function (req) {
		return new Promise(async (resolve) => {
			const { wpBlog,wpUser,Term,WPPostMeta,WpTermTaxonomy } = req.db;

			const offset = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.pageSize);
			const limit = parseInt(req.query.pageSize);

			const whereCondition = {};
			whereCondition.category_type = 'course';
			if(req.query.course_type){
				whereCondition.course_type = req.query.course_type
			}

			wpBlog
				.findAll({ include: [
						{
							model: wpUser,
							attributes: ['user_login', 'user_email','user_nicename','display_name'], // Select specific columns from WpUser
						}, {
							model: Term, // Include the Term model
							attributes: ['term_id','name','slug','term_group','category_type','course_type'], // Specify the attribute(s) you want to select
							where: whereCondition,
							through: { attributes: [] },
							include: {
								model: WpTermTaxonomy, // Include the Term model for WpTermTaxonomy
								attributes: [], // If you don't want to select any attributes from Term
								attributes: ['term_taxonomy_id','term_id','taxonomy','description','parent','count'], // Specify the attribute(s) you want to select

							},// Exclude attributes from the join table (wp_term_relationships)
						},{
							model: WPPostMeta, // Include the Term model
							attributes: ['meta_key', 'meta_value', 'post_id','meta_id'],
							where: {
								meta_key: ['price', 'video_duration','duration_info','views','lesson_shortcode','stm-zoom','lesson_embed_ctx']
							}
							// Specify the attribute(s) you want to select

						}
					],
					where: {"post_status":"publish"} ,
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

	sendmail :function(req){
		return new Promise((resolve, reject) => {

			// Create a transporter object using SMTP transport
			let transporter = nodemailer.createTransport({
				host: process.env.MAILHOST,
				port: 465, // cPanel SMTP port (usually 465 for SSL)
				secure: true, // true for 465, false for other ports
				auth: {
					user: process.env.MAILUSER,
					pass: process.env.MAILPASS
				}
			});


// Send mail with defined transport object
			// Send mail with defined transport object
			try {
				transporter.sendMail(req, (error, info) => {
					if (error) {
						console.error('Error occurred while sending email:', error);
						reject(error);

					} else {
						console.log('Email sent successfully:', info.messageId);
						resolve(info);

					}
				});
			} catch (error) {
				console.error('An error occurred:', error);
				reject(error);

			}

		})
	},


	getBlogCategory: function (req) {
		return new Promise(async (resolve) => {
			const { wpBlog,wpUser,Term,WpTermTaxonomy, } = req.db;

			Term
				.findAll({
					include: {
						model: WpTermTaxonomy, // Include the Term model for WpTermTaxonomy
						attributes: [], // If you don't want to select any attributes from Term
						attributes: ['term_taxonomy_id','term_id','taxonomy','description','parent','count'], // Specify the attribute(s) you want to select

					},
					where: { category_type: req.params.blog  },
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

	getQod: function (req) {
		return new Promise(async (resolve) => {
			const { wpBlog,wpUser,Term,WPPostMeta,WpTermTaxonomy, } = req.db;

			const offset = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.pageSize);
			const limit = parseInt(req.query.pageSize);

			const whereCondition = {};
			whereCondition.category_type = 'qod';
			if(req.query.course_type){
				whereCondition.course_type = req.query.course_type
			}

			wpBlog
				.findAll({ include: [
						{
							model: wpUser,
							attributes: ['user_login', 'user_email','user_nicename','display_name'], // Select specific columns from WpUser
						}, {
							model: Term, // Include the Term model
							attributes: ['term_id','name','slug','term_group','category_type','course_type'], // Specify the attribute(s) you want to select
							where: whereCondition,
							include: {
								model: WpTermTaxonomy, // Include the Term model for WpTermTaxonomy
								attributes: [], // If you don't want to select any attributes from Term
								attributes: ['term_taxonomy_id','term_id','taxonomy','description','parent','count'], // Specify the attribute(s) you want to select

							}
						}
					],
					where: {"post_status":"publish"} ,
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

	getExamUpdates: function (req) {
		return new Promise(async (resolve) => {
			const { wpBlog,wpUser,Term,WPPostMeta,WpTermTaxonomy, } = req.db;

			const offset = (parseInt(req.query.pageNumber) - 1) * parseInt(req.query.pageSize);
			const limit = parseInt(req.query.pageSize);

			const whereCondition = {};
			whereCondition.category_type = 'exam-updates';
			if(req.query.course_type){
				whereCondition.course_type = req.query.course_type
			}

			wpBlog
				.findAll({ include: [
						{
							model: wpUser,
							attributes: ['user_login', 'user_email','user_nicename','display_name'], // Select specific columns from WpUser
						}, {
							model: Term, // Include the Term model
							attributes: ['term_id','name','slug','term_group','category_type','course_type'], // Specify the attribute(s) you want to select
							where: whereCondition,
							include: {
								model: WpTermTaxonomy, // Include the Term model for WpTermTaxonomy
								attributes: [], // If you don't want to select any attributes from Term
								attributes: ['term_taxonomy_id','term_id','taxonomy','description','parent','count'], // Specify the attribute(s) you want to select

							}
						}
					],
					where: {"post_status":"publish"} ,
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


};


