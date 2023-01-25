const db = require('../PgSql').getInstance();

const {
    postEstablishmentPhotos, updateEstablishmentPhotos
} = require("../helpers/fileUploader.helper");

const {establishmentRepository} = require("../repository/index");

module.exports = {
    getEstablishments: async (req, res) => {
        try {
            const establishments = await establishmentRepository.find(req.query);

            res.json(establishments);
        } catch (e) {
            res.json(e.message)
        }
    },

    getOneEstablishments: async (req, res) => {
        try {
            const Establishment = db.getModel('Establishment');

            const establishment = await Establishment.findAll({where: {establishment_id: req.params.id}});

            res.json(establishment);
        } catch (e) {
            res.json(e.message);
        }
    },

    createEstablishments: async (req, res) => {
        try {
            const Establishment = db.getModel('Establishment');

            const {establishment_id} = await (await Establishment.create({...req.body,tags:req.body.tags.split(',')})).dataValues;

            await postEstablishmentPhotos(req.body.user_id, establishment_id, req.photos, Establishment);

            res.status(200).json('created');
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteEstablishment: async (req, res) => {
        try {
            const Establishment = db.getModel('Establishment');

            const Review = db.getModel('Review');

            await Establishment.destroy({where: {establishment_id: req.params.id}});

            await Review.destroy({where: {establishment_id: req.params.id}});

            res.json('Deleted')
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

            res.json('updated');
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

            res.json('updated');
        } catch (e) {
            res.json(e.message);
        }
    },

    getEstablishmentsByUserId: async (req, res) => {
        try{
            const establishments = await establishmentRepository.findByUserId(req.query,req.params.id)

            res.json(establishments);
        }catch (e){
            res.json(e.message);
        }

    },

    getEstablishmentsByTypeAndUserId: async (req, res) => {
        try{
            const Establishment = db.getModel('Establishment');

            const {id, type} = req.params

            const establishments = await Establishment.findAll({where: {user_id: id, type}, raw: true});

            res.json(establishments);
        }catch (e) {
            res.json(e.message)
        }

    },


    getTypeEstablishments: async (req, res) => {
        try {
            const Type_Establishments = db.getModel('Type_Establishments');

            const types = await Type_Establishments.findAll({});

            res.json(types);
        } catch (e) {
            res.json(e.message);
        }
    }
};
