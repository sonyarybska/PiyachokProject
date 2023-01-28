const {ApiError} = require("../errors/ApiError");

module.exports = {
    isBodyValid: (validator) => (req, res, next) => {
        try {
            const {user_id, location} = req.body;


            const data = {...JSON.parse(req.body.data), user_id, location};

            const {error, value} = validator.validate(data);

            if (error) {
                throw new ApiError(error.details[0].message, 400);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e)
        }
    },

    checkFiles: (req, res, next) => {
        try {

            if (!req.files) {
                throw new ApiError('Photos not exist', 400)
            }

            req.photos = req.files

            next();
        } catch (e) {
            next(e)
        }
    },


}