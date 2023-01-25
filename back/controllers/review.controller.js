const sequelize = require("sequelize");
const {reviewsRepository} = require("../repository/index");
const db = require('../PgSql').getInstance();

module.exports = {
    getReviewsByEstablishmentId: async (req, res) => {
        try {
            const Review = db.getModel('Review');
            const User = db.getModel('User');

            const reviews = await Review.findAll({where: {establishment_id: req.params.id}, include: User});

            res.json(reviews);
        } catch (e) {
            res.json(e.message);
        }
    },

    getReviewsByUserId: async (req, res) => {
        try {
            const data = await reviewsRepository.findByUserId(req.query, req.params.id)

            res.json(data);
        } catch (e) {
            res.json(e.message);
        }
    },

    postReview: async (req, res) => {
        const Review = db.getModel('Review');

        const review = await Review.create({...req.body});

        res.json(review);
    },

    getAverageRatingById: async (req, res) => {
        const Review = db.getModel('Review');

        const avgRating = await Review.findAll({
            where: {establishment_id: req.params.id},
            attributes: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('rating')), 1), 'avgRating']]
        });

        res.json(avgRating);
    }
}