const router = require('express').Router();

const {getNews, createNews, getNewsByEstablishmentId, getNewsTypes} = require('./../controllers/news.conroller');

router.get('/', getNews);
router.post('/', createNews);

router.post('/:id', getNewsByEstablishmentId);
router.get('/types', getNewsTypes);

module.exports = router;