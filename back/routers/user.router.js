const router = require('express').Router();

const {getUsers, getOneUser, createUser, deleteUser, updateUser, getUsersEstablishments, getReviewsByUserId, addFavorite} = require('./../controllers/user.controller');
const {checkGoogleId, checkUserExist} = require('./../middlewares/user.middleware');


router.get('/', getUsers);
router.post('/', checkGoogleId, checkUserExist, createUser);


router.get('/:id', getOneUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

router.post('/:id/favorite', addFavorite);
router.get('/:id/reviews', getReviewsByUserId);
router.get('/:id/establishments', getUsersEstablishments);

module.exports = router;