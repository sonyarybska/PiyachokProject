const authService = require("../services/auth.service");
const messagesEnum = require("./../errors/message-enum");
const {statusEnum} = require("./../errors/index");
const db = require('../PgSql').getInstance();
const {ApiError} = require("./../errors/ApiError");

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization');


            if (!token) {
                throw new ApiError('Denied', 401);
            }

            authService.verifyToken(token);

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const Token = db.getModel('Token');
            const User = db.getModel('User');

            const {refreshToken} = req.cookies;
            console.log(refreshToken);
            if (!refreshToken) {
                throw new ApiError(messagesEnum.INVALID_TOKEN, statusEnum.UNAUTHORIZED);
            }

            authService.verifyToken(refreshToken, 'refresh');

            const tokenResponse = await Token.findOne({where: {refresh_token: refreshToken}, include: User})

            if (!tokenResponse.dataValues || !tokenResponse.dataValues.user) {
                throw new ApiError(messagesEnum.INVALID_TOKEN, statusEnum.UNAUTHORIZED);
            }

            req.user = tokenResponse.user.dataValues;
            req.token = refreshToken;

            await Token.destroy({where: {refresh_token: refreshToken}});
            next();
        } catch (e) {
            next(e);
        }
    }
}