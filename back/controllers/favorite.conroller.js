const {favoriteRepository} = require("../repository/index");
const {OK, CREATED, NO_CONTENT} = require("../errors/status-enum");
const {ADD_ITEM, DELETE_ITEM} = require("../errors/message-enum");
const db = require('../PgSql').getInstance();

module.exports = {
    getFavorite: async (req, res) => {
        try {
            const Favorite = db.getModel('Favorite');

            const favorite = await Favorite.findAll({});

            res.json(favorite);
        } catch (e) {
            res.status(OK).json(e.message)
        }
    },

    getFavoriteByUserId: async (req, res) => {
        try {

            const favorite =  await favoriteRepository.findByUserId(req.query, req.params.id)

            res.status(OK).json(favorite);
        } catch (e) {
            res.json(e.message)
        }
    },

    addFavorite: async (req, res) => {
        try {
            const Favorite = db.getModel('Favorite');

            const {establishment_id} = req.body;

            await Favorite.create({user_id: req.params.id, establishment_id}, {returning: true, plain: true});

            res.status(CREATED).json(ADD_ITEM);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteFavorite: async (req, res) => {
        try {
            const model = db.getModel('Favorite');

            const {user_id, est_id} = req.params;

            await model.destroy({where: {user_id, establishment_id: est_id}});

            res.status(NO_CONTENT).json(DELETE_ITEM);
        } catch (e) {
            res.json(e.message);
        }
    }
}