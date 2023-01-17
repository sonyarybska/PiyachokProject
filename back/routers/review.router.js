const router = require('express').Router();

const {getReviewsByEstablishmentId, postReview, getAverageRatingById} = require('./../controllers/review.controller');

router.post('/', postReview);

router.get('/:id', getReviewsByEstablishmentId);
router.get('/:id/rating', getAverageRatingById);

module.exports = router;