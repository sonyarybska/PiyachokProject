const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
    getUsersEstablishments,
    getReviewsByUserId,
    getFavorite,
    addFavorite,
    getFavoriteByUserId,
    deleteFavorite
} = require('./../controllers/user.controller');
const {checkGoogleId, checkUserExist} = require('./../middlewares/user.middleware');
const {checkFavoriteExist} = require("../middlewares/user.middleware");


router.get('/', getUsers);
router.post('/', checkGoogleId, checkUserExist, createUser);

router.get('/favorite', getFavorite);
router.get('/:id/favorite', getFavoriteByUserId);
router.post('/:id/favorite', checkFavoriteExist, addFavorite);
router.delete('/:id/favorite/:est_id', deleteFavorite);

router.get('/:id', getOneUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);



router.get('/:id/reviews', getReviewsByUserId);
router.get('/:id/establishments', getUsersEstablishments);

module.exports = router;