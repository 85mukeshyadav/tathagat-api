const {resolve} = require("sequelize-cli/lib/helpers/path-helper");


module.exports = {

    getCourses: function (req) {
        return new Promise(async (resolve) => {
            const {courses} = req.db;
            await courses.findOne({where: {courseId: req.params.courseCourseId}})
                .then(async (s) => {
                    console.log(s)
                    if (s) {
                        resolve(s)
                    } else {
                        resolve({})
                    }
                });
        })
    },

    getPackageTest: function (req) {
        return new Promise(async (resolve) => {
            const {sequelize} = req.db;
            let aqlQuery = "SELECT packageId, JSON_EXTRACT(TestList, '$[*].TestId') AS testIds FROM packages ";
            aqlQuery += " WHERE packageId = '" + packageId + "'";
            let result = await sequelize.query(aqlQuery, {type: sequelize.QueryTypes.SELECT});
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

            const {userPackages} = req.db;
            userPackages.findAll({where: {userEmailId: req.params.userId,status:1}, order: [["updated_at", "DESC"]]})
                .then(async (userpackages) => {
                    //console.log("userpackages --", userpackages[0]);
                    if (!userpackages) {
                        resolve(null);
                    } else {
                        resolve(userpackages)
                    }
                });

        });
    },

    getPackageInfo: function (req) {
        return new Promise(async (resolve) => {
            const {packages} = req.db;
            packages.findOne({where: {packageId: req.params.packageId}})
                .then((s) => {
                    if (!s) {
                        resolve(null);
                    }else {
                        resolve(s)
                    }
                });
        });
    }
}