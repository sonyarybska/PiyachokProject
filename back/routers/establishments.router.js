const router = require('express').Router();

const {
    getEstablishments,
    createEstablishments,
    deleteEstablishment,
    getOneEstablishments,
    getTypeEstablishments,
    putEstablishment,
    patchEstablishments,
    getEstablishmentsByUserId,
} = require("../controllers/establishments.controller");

const {isBodyValid, checkFiles} = require("../middlewares/establishments.middleware");

const {checkAccessToken} = require("../middlewares/auth.middleware");

const {createEstablishmentValidator, updateEstablishmentValidator} = require("../validators/establishmets.validator");

router.get('/', getEstablishments);
router.post('/', checkAccessToken, isBodyValid(createEstablishmentValidator), checkFiles, createEstablishments);

router.get('/type', getTypeEstablishments);

router.get('/:id', getOneEstablishments);
router.delete('/:id', deleteEstablishment);
router.put('/:id', checkAccessToken, isBodyValid(updateEstablishmentValidator), checkFiles, putEstablishment);
router.patch('/:id',checkAccessToken,patchEstablishments);

router.get('/users/:id', getEstablishmentsByUserId);


module.exports = router;