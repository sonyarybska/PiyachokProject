const {saveToken} = require("../services/auth.service");
const {generateTokens} = require("../services/auth.service");
const db = require('../PgSql').getInstance();

module.exports = {
    getUsers: async (req, res) => {
        try {
            const model = db.getModel('User');

            const items = await model.findAll();

            res.json(items);
        } catch (e) {
            res.json(e.message)
        }
    },

    getOneUser: async (req, res) => {
        try {
            const model = db.getModel('User');

            const item = await model.findAll({where: {user_id: req.params.id}});

            res.json(item);
        } catch (e) {
            res.json(e.message);
        }
    },

    getUsersEstablishments: async (req, res) => {
        const model = db.getModel('Establishment');

        const items = await model.findAll({where: {user_id: req.params.id}, raw: true});

        res.json({data: items});
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

            res.json({user: user.dataValues, tokens});
        } catch (e) {
            res.json(e.message)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const User = db.getModel('User');
            const Token = db.getModel('Token');

            await User.destroy({where: {user_id: req.params.id}});

            await Token.destroy({where: {user_id: req.params.id}});

            res.json('Deleted')
        } catch (e) {
            res.json(e.message)
        }
    },

    updateUser: async (req, res) => {
        try {
            const model = db.getModel('User');

            await model.update({...req.body}, {where: {user_id: req.params.id}});

            res.json('Updated');
        } catch (e) {
            res.json(e.message);
        }
    },

    getReviewsByUserId: async (req, res) => {
        try {
            const Review = db.getModel('Review');

            const Establishment = db.getModel('Establishment');

            const {id} = req.params;

            const data = await Review.findAll({where: {user_id: id}, include: [{model: Establishment, as: 'establishment'}]});

            res.json(data);
        } catch (e) {
            res.json(e.message);
        }
    },

    addFavorite: async (req, res) => {
        try {
            const model = db.getModel('Favorite');

            const {establishment_id} = req.body;
            console.log(req.params);
            console.log(establishment_id);
            console.log(id);

            const a = await model.findAll({});

            console.log(a);

            res.json(a);
        } catch (e) {
            res.json(e.message);
        }
    }
};
