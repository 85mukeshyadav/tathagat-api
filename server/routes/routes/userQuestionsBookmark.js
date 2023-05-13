const express = require('express');

const {protect, authorize} = require('../../middleware/auth');

module.exports = (app, db) => {
    const {userQuestionsBookmark, question, topic, chapter} = db;
    app.get('/userbookmarklist/:userEmailId', protect, function (req, res) {

        userQuestionsBookmark.findAll({
            where: {
                userEmailId: req.params.userEmailId
            }
        }).then((s, err) => {
            if (s) {
                console.log(s)
                res.status(200).send({status: 200, data: s})
            } else {
                console.log(err)
                res.status(200).send({status: 400, eroor: err})
            }
        })


    });

    app.post('/addbookmark', (req, res) => {
        console.log("file: addbookmark", req.body, req.body.userEmailId)
        userQuestionsBookmark.create({
            testId  : req.body.testId  ,
            userEmailId : req.body.userEmailId,
            questionsId: req.body.questionsId,
            status : req.body.status ,
        }).then((s) => {
            if (s) {
                res.status(200).send(s);
            }
        })
    });

};
