const router = require('express').Router();

const {login, logout, refresh} = require('./../controllers/auth.controller');
const {checkAccessToken, checkRefreshToken} = require('./../middlewares/auth.middleware');


router.get('/login', login);
router.post('/logout',logout);
router.get('/refresh', checkRefreshToken, refresh);

module.exports = router;