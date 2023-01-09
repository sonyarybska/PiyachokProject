const {createEstablishmentValidator} = require("../validators/establishmets.validator");

module.exports = {
    isBodyValid: () => async (req, res, next) => {
        try{


            const {error, value} = createEstablishmentValidator.validate(JSON.parse(req.body.data));

            if (error) {
               console.log(error);
            }

            req.body = value;
            next();
        }catch (e){
            next(e)
        }
    }
}