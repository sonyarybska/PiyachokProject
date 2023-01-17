const sequelize = require("sequelize");
const db = require('../PgSql').getInstance();

module.exports = {
    getReviewsByEstablishmentId: async (req, res) => {
        try {
            const {id} = req.params;
            console.log(id);
            const model = db.getModel('Review');
            const User = db.getModel('User');

            const response = await model.findAll({where: {establishment_id: +id}, include: User});

            res.json(response);
        } catch (e) {
            res.json(e.message);
        }
    },

    postReview: async (req, res) => {
        const model = db.getModel('Review');

        const created = await model.create({...req.body});

        res.json(created);
    },

    getAverageRatingById: async (req, res) => {
        const model = db.getModel('Review');
        const {id} = req.params;

        const avgRatings = await model.findAll({
            where:
                {establishment_id: +id},
            attributes: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('rating')), 1), 'avgRating']]

        })

        res.json(avgRatings);
    }
}