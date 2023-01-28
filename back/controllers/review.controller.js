const sequelize = require("sequelize");
const {reviewsRepository} = require("../repository/index");
const {OK, CREATED} = require("../errors/status-enum");
const {ADD_ITEM, DELETE_ITEM} = require("../errors/message-enum");
const db = require('../PgSql').getInstance();

module.exports = {
    getReviewsByEstablishmentId: async (req, res) => {
        try {
            const reviews = await reviewsRepository.findByEstablishmentId(req.query,req.params.id);

            res.status(OK).json(reviews);
        } catch (e) {
            res.json(e.message);
        }
    },

    getReviewsByUserId: async (req, res) => {
        try {
            const data = await reviewsRepository.findByUserId(req.query, req.params.id)

            res.status(OK).json(data);
        } catch (e) {
            res.json(e.message);
        }
    },

    postReview: async (req, res) => {
        try{
            const Review = db.getModel('Review');

            await Review.create({...req.body});

            res.status(CREATED).json(ADD_ITEM);
        }
        catch (e){
            res.json(e.message)
        }

    },

    getAverageRatingById: async (req, res) => {
        try{
            const Review = db.getModel('Review');

            const avgRating = await Review.findAll({
                where: {establishment_id: req.params.id},
                attributes: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('rating')), 1), 'avgRating']]
            });

            res.status(OK).json(avgRating[0]);
        }catch (e) {
            res.json(e.message);
        }
    },

    deleteReview:async (req,res)=>{
        try {
            const Review = db.getModel('Review');

            await Review.destroy({where:{review_id:req.params.id}});

            res.status(OK).json(DELETE_ITEM);
        }catch (e){
            res.json(e.message);
        }
    }
}