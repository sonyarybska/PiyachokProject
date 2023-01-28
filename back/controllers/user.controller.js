const {saveToken} = require("../services/auth.service");
const {generateTokens} = require("../services/auth.service");
const {deleteEstablishmentPhotosByUserId} = require("../helpers/fileUploader.helper");
const {DELETE_ITEM, UPDATE_ITEM} = require("../errors/message-enum");
const {NO_CONTENT, CREATED, OK} = require("../errors/status-enum");
const db = require('../PgSql').getInstance();

module.exports = {
    getUsers: async (req, res) => {
        try {
            const User = db.getModel('User');

            const users = await User.findAll({});

            res.status(OK).json(users);
        } catch (e) {
            res.json(e.message)
        }
    },

    getOneUser: async (req, res) => {
        try {
            const User = db.getModel('User');

            const user = await User.findOne({where: {user_id: req.params.user_id}});

            res.status(OK).json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const User = db.getModel('User');

            const {name, email, picture} = req.body;

            const user = await User.create({name, email, picture});

            const {user_id} = user.dataValues;

            const tokens = generateTokens({email, user_id});

            await saveToken(user_id, tokens.refresh_token);

            res.cookie('refreshToken', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            res.status(CREATED).json({user: user.dataValues, tokens});
        } catch (e) {
            res.json(e.message)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const User = db.getModel('User');
            const Token = db.getModel('Token');
            const Review = db.getModel('Review');
            const Establishment = db.getModel('Establishment');

            await User.destroy({where: {user_id: req.params.user_id}});

            await Token.destroy({where: {user_id: req.params.user_id}});

            await Review.destroy({where: {user_id: req.params.user_id}});

            await Establishment.destroy({where: {user_id: req.params.user_id}});

            await deleteEstablishmentPhotosByUserId(req.params.user_id);

            res.status(NO_CONTENT).json(DELETE_ITEM);
        } catch (e) {
            res.json(e.message)
        }
    },

    updateUser: async (req, res) => {
        try {
            const User = db.getModel('User');

            await User.update({...req.body}, {where: {user_id: +req.params.user_id},  returning: true, plain: true});

            res.status(NO_CONTENT).json(UPDATE_ITEM);
        } catch (e) {
            res.json(e.message);
        }
    }
};
