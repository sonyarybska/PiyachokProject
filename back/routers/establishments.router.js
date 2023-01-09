const router = require('express').Router();

const {getEstablishments, createEstablishments, deleteEstablishment, getOneEstablishments, getTypeEstablishments, updateEstablishment} = require("../controllers/establishments.controller");
const {isBodyValid} = require("../middlewares/establishments. middleware");
const {checkAccessToken} = require("../middlewares/auth.middleware");

router.get('/',getEstablishments);
router.post('/', createEstablishments);

router.get('/type', getTypeEstablishments);

router.get('/:id', getOneEstablishments);
router.delete('/:id', deleteEstablishment);
router.put('/:id', updateEstablishment);

module.exports = router;