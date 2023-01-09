const router = require('express').Router();

const {getReviewsByEstablishmentId, getReviewsByUserId, postReview} = require('./../controllers/review.controller');

router.post('/', postReview);

router.get('/:id', getReviewsByEstablishmentId);

module.exports = router;