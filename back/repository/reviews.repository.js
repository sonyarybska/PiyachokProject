const {ApiError} = require("../errors/ApiError");
const db = require('../PgSql').getInstance();

module.exports = {
    findByUserId: async (query, id) => {
        try {
            const Review = db.getModel('Review');
            const Establishment = db.getModel('Establishment');


            const {limit = 12, page = 1} = query;

            const reviews = await Review.findAll({
                where: {user_id: id},
                limit,
                offset: (page - 1) * limit,
                include: [{model: Establishment, as: 'establishment'}]
            });

            const count = await Review.count();

            return {
                reviews,
                count
            }
        } catch (e) {
            throw new ApiError(e.message, 400);
        }
    }
}