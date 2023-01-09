const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const db = require('../PgSql').getInstance();

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('./../constants/config');
const {ACCESS, REFRESH} = require("./../constants/token_type_enum");
const {ApiError} = require("./../errors/ApiError");
const {messageEnum, statusEnum} = require('./../errors');

const CLIENT_ID = "940956205344-jq5i1r0avmeajjv9enjo46luepi52o1t.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
    generateTokens: (payload) => {
        const access_token = jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: '15s'});
        const refresh_token = jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },

    saveToken: async (userId, refreshToken) => {
        try {
            const Token = db.getModel('Token');

            const token = await Token.findOne({where: {user_id: userId}});

            if (token) {
                token.refresh_token = refreshToken;
                return token.save();
            }

            await Token.create({user_id: userId, refresh_token: refreshToken});

        } catch (e) {
            throw new ApiError(e.message, 400);
        }
    },

    verifyToken(token, type = ACCESS) {
        let secretWord = '';
        try {
            switch (type) {
                case ACCESS:
                    secretWord = JWT_ACCESS_SECRET;
                    break;
                case REFRESH:
                    secretWord = JWT_REFRESH_SECRET;
            }
            jwt.verify(token, secretWord);

        } catch (e) {
            throw new ApiError(messageEnum.INVALID_TOKEN, statusEnum.UNAUTHORIZED)
        }
    },

    verifyGoogleId(id) {
        return client.verifyIdToken({
            idToken: id,
            audience: CLIENT_ID
        });
    },

}