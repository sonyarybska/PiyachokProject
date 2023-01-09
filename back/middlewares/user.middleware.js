const {verifyGoogleId} = require("../services/auth.service");
const db = require('../PgSql').getInstance();

module.exports = {

    checkGoogleId: async (req, res, next) => {
        const data = await verifyGoogleId(req.body.tokenId);

        const {email_verified, name, email, picture} = data.payload;

        if (!email_verified) {
            throw new Error('User is not defined');
        }

        req.body = {name, email, picture};
        next();
    },

    checkUserExist: async (req, res, next) => {
        const model = db.getModel('User');

        const {name, email, picture} = req.body;

        const user = await model.findOne({where: {email}});

        if (user) {
            req.app.set('email', email)
            return res.redirect('auth/login');
        }

        req.body = {name, email, picture};

        next();
    },

    checkFavoriteExist: async (req, res, next) => {
        const Favorite = db.getModel('Favorite');
        const {id} = req.params;
        const {establishment_id} = req.body;

        const favorite = await Favorite.findOne({where: {establishment_id, user_id:id}});

        if(favorite){
            return;
        }

        next();
    }
}