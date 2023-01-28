const router = require('express').Router();

const {deleteFavorite, addFavorite, getFavoriteByUserId, getFavorite} = require("../controllers/favorite.conroller");
const {checkFavoriteExist} = require("../middlewares/favorite.middleware");
const {checkAccessToken} = require("../middlewares/auth.middleware");

router.get('/', checkAccessToken, getFavorite);

router.get('/:id',checkAccessToken, getFavoriteByUserId);
router.post('/:id', checkAccessToken, checkFavoriteExist, addFavorite);

router.delete('/:user_id/:est_id',checkAccessToken, deleteFavorite);

module.exports = router;