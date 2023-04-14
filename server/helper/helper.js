


module.exports = {

    getCourses : function (req){
        return new Promise(async (resolve) => {
            const {courses} = req.db;
            await courses.findOne({where: {courseId: req.params.courseCourseId}})
                .then(async (s) => {
                    console.log(s)
                    if (s) {
                        resolve(s)
                    }
                });
        })
    },
}