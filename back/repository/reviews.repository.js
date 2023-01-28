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
    },
    findByEstablishmentId: async (query, id) => {
        try {
            const Review = db.getModel('Review');
            const User = db.getModel('User');


            const {limit = 12, page = 1, sort=null} = query;

            let reviews;
            console.log(query);

            if(sort){
               reviews = await Review.findAll({
                    where: {establishment_id: id},
                    limit,
                    offset: (page - 1) * limit,
                    include: User,
                   order: [sort.split('-')],
                });
            }
            else{
                reviews = await Review.findAll({
                    where: {establishment_id: id},
                    limit,
                    offset: (page - 1) * limit,
                    include: User
                });
            }

            console.log(id);

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