const {saveToken} = require("../services/auth.service");
const {generateTokens} = require("../services/auth.service");
const {ApiError} = require("../errors/ApiError");
const db = require('../PgSql').getInstance();


module.exports = {
    login: async (req, res) => {
        try {
            const model = db.getModel('User');

            const user = await model.findOne({where: {email: req.app.get('email')}});

            const {user_id, email} = user.dataValues

            const tokens = generateTokens({user_id, email});

            await saveToken(user_id, tokens.refresh_token);

            res.cookie('refreshToken', tokens.refresh_token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true
            });

            return res.json({user: user.dataValues, tokens});
        } catch (e) {
            res.json(e.message, 'dkjdj');
        }
    },

    logout: async (req, res) => {
        try {
            const Token = db.getModel('Token');

            const {refreshToken} = req.cookies;

            await Token.destroy({where: {refresh_token: refreshToken}});

            res.clearCookie('refreshToken');

            return res.status(200);
        } catch (e) {
            res.json(e.message);
        }
    },

    refresh: async (req, res) => {
        try {
            const {user_id, email} = req.user;

            const tokens = generateTokens({user_id, email});

            await saveToken(user_id, tokens.refresh_token);

            res.cookie('refreshToken', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.json({tokens, user: req.user});
        } catch (e) {
            throw new ApiError(e.message, 400);
        }
    }
}
