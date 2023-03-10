const router = require('express').Router();

const {
    getReviewsByEstablishmentId,
    postReview,
    getAverageRatingById,
    getReviewsByUserId,
    deleteReview
} = require('./../controllers/review.controller');
const {checkAccessToken} = require("../middlewares/auth.middleware");

router.post('/',checkAccessToken, postReview);

router.get('/:id', getReviewsByEstablishmentId);
router.delete('/:id', deleteReview);

router.get('/:id/rating', getAverageRatingById);

router.get('/users/:id', getReviewsByUserId);

module.exports = router;