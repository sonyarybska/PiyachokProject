const router = require('express').Router();

const {deleteFavorite, addFavorite, getFavoriteByUserId, getFavorite} = require("../controllers/favorite.conroller");
const {checkFavoriteExist} = require("../middlewares/favorite.middleware");
const {checkAccessToken} = require("../middlewares/auth.middleware");

router.get('/', getFavorite);

router.get('/:id', getFavoriteByUserId);
router.post('/:id', checkAccessToken, checkFavoriteExist, addFavorite);

router.delete('/:user_id/:est_id', deleteFavorite);

module.exports = router;