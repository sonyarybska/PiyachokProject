const {ApiError} = require("../errors/ApiError");
const db = require('../PgSql').getInstance();

module.exports = {
    findByUserId: async (query, id) => {
        try {
            const Favorite = db.getModel('Favorite');
            const Establishment = db.getModel('Establishment');


            const {limit = 12, page = 1} = query;

            const favorite = await Favorite.findAll({
                where: {user_id: id},
                limit,
                offset: (page - 1) * limit,
                include: [{model: Establishment, as: 'establishment',required:true }]
            });

            const count = await Favorite.count();

            return {
                favorite,
                count
            }
        } catch (e) {
            throw new ApiError(e.message, 400);
        }
    }
}