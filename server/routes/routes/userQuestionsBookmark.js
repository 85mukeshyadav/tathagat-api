const express = require('express');

const {protect, authorize} = require('../../middleware/auth');
const {getQueInfo, getPackageInfo} = require("../../helper/helper");

module.exports = (app, db) => {
    const {userQuestionsBookmark, question, topic, chapter} = db;
    app.get('/userbookmarklist/:userEmailId', function (req, res) {
        req.db = db
        userQuestionsBookmark.findAll({
            where: {
                userEmailId: req.params.userEmailId, status: 1,
            }
        }).then(async (s, err) => {
            if (s) {
                var index = 0
                var bookmarkList = []
                for (var que of s) {
                    req.params.questionId = que.questionsId
                    req.params.testId = que.testId
                    var info = await getQueInfo(req);
                    console.log("info", info)
                    if (info != null) {
                        bookmarkList.push({questions_info: info, other_info: s[index]})
                    }
                    index++
                }

                console.log("bookmarkList",bookmarkList)
                res.status(200).send({status: 200, data: bookmarkList})
            } else {
                console.log(err)
                res.status(200).send({status: 400, eroor: err})
            }
        })


    });

    app.post('/addbookmark', (req, res) => {
        console.log("file: addbookmark", req.body, req.body.userEmailId)
        userQuestionsBookmark.findOne({where: {
                testId: req.body.testId,
                userEmailId: req.body.userEmailId,
                questionsId: req.body.questionsId,
            }})
            .then((exist) => {
                console.log("exist",exist);
                if (!exist) {
                    userQuestionsBookmark.create({
                        testId: req.body.testId,
                        userEmailId: req.body.userEmailId,
                        questionsId: req.body.questionsId,
                        status: req.body.status,
                    }).then((s) => {
                        if (s) {
                            res.status(200).send({status: 200, message: "done"});
                        }
                    })

                } else {

                    userQuestionsBookmark.update({
                        testId: req.body.testId,
                        userEmailId: req.body.userEmailId,
                        questionsId: req.body.questionsId,
                        status: req.body.status,}, {
                        where: {
                            testId: req.body.testId,
                            userEmailId: req.body.userEmailId,
                            questionsId: req.body.questionsId,
                        }
                    }).then((bookmark) => {
                            res.status(200).send({status: 200, message: "Update Done"});
                    });
                }
            });


    });

};
