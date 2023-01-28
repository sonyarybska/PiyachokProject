const db = require('../PgSql').getInstance();

const {
    postEstablishmentPhotos, updateEstablishmentPhotos, deleteEstablishmentPhotosByEstablishmentsId
} = require("../helpers/fileUploader.helper");

const {establishmentRepository} = require("../repository/index");
const {CREATED, OK, NO_CONTENT} = require("../errors/status-enum");
const {DELETE_ITEM, ADD_ITEM, UPDATE_ITEM} = require("../errors/message-enum");

module.exports = {
    getEstablishments: async (req, res) => {
        try {
            const establishments = await establishmentRepository.find(req.query);

            res.status(OK).json(establishments);
        } catch (e) {
            res.json(e.message)
        }
    },

    getOneEstablishments: async (req, res) => {
        try {
            const Establishment = db.getModel('Establishment');

            const establishment = await Establishment.findOne({where: {establishment_id: req.params.id}});

            res.status(OK).json(establishment);
        } catch (e) {
            res.json(e.message);
        }
    },

    createEstablishments: async (req, res) => {
        try {
            const Establishment = db.getModel('Establishment');

            const {establishment_id} = await (await Establishment.create({
                ...req.body,
                tags: req.body.tags.split(',')
            })).dataValues;

            if (req.photos) {
                await postEstablishmentPhotos(req.body.user_id, establishment_id, req.photos, Establishment);
            }
            res.status(CREATED).json(ADD_ITEM);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteEstablishment: async (req, res) => {
        try {
            const Establishment = db.getModel('Establishment');

            const Review = db.getModel('Review');

            const Favorite = db.getModel('Favorite');

            await Establishment.destroy({where: {establishment_id: req.params.id}});

            await Review.destroy({where: {establishment_id: req.params.id}});

            await Favorite.destroy({where: {establishment_id: req.params.id}});

            await deleteEstablishmentPhotosByEstablishmentsId(req.params.id)

            res.status(NO_CONTENT).json(DELETE_ITEM)
        } catch (e) {
            res.json(e.message)
        }
    },

    putEstablishment: async (req, res) => {
        try {
            req.params.id
            const Establishment = db.getModel('Establishment');

            const updatedData = await Establishment.update({...req.body}, {
                where: {establishment_id: req.params.id}, returning: true, plain: true
            });

            if (req.files) {
                await updateEstablishmentPhotos(req.body.user_id, updatedData[1].dataValues.establishment_id, req.files, Establishment);
            }

            res.status(NO_CONTENT).json(UPDATE_ITEM);
        } catch (e) {
            res.json(e.message);
        }
    },

    patchEstablishments: async (req, res) => {
        try {
            const Establishment = db.getModel('Establishment');

            const {approved, pending, rejected} = req.body;

            await Establishment.update({approved, rejected, pending}, {
                where: {establishment_id: req.params.id},
            });

            res.status(NO_CONTENT).json(UPDATE_ITEM);
        } catch (e) {
            res.json(e.message);
        }
    },

    getEstablishmentsByUserId: async (req, res) => {
        try {
            const establishments = await establishmentRepository.findByUserId(req.query, req.params.id)

            res.status(OK).json(establishments);
        } catch (e) {
            res.json(e.message);
        }

    },


    getTypeEstablishments: async (req, res) => {
        try {
            const Type_Establishments = db.getModel('Type_Establishments');

            const types = await Type_Establishments.findAll({});

            res.status(OK).json(types);
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
