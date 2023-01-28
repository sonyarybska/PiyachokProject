const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    deleteUser,
    updateUser,
} = require('./../controllers/user.controller');
const {checkGoogleId, checkUserExist} = require("../middlewares/user.middleware");
const {checkAccessToken} = require("../middlewares/auth.middleware");

router.get('/', checkAccessToken, getUsers);
router.post('/', checkGoogleId, checkUserExist, createUser);

router.get('/:user_id', checkAccessToken, getOneUser);
router.delete('/:user_id', deleteUser);
router.put('/:user_id',checkAccessToken, updateUser);

module.exports = router;