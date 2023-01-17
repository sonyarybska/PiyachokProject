const db = require('../PgSql').getInstance();

const {
    postEstablishmentPhotos,
    updateEstablishmentPhotos
} = require("../helpers/fileUploader.helper");

const {establishmentRepository} = require("../repository/index");

module.exports = {
    getEstablishments: async (req, res) => {
        try {
            const items = await establishmentRepository.find(req.query);

            res.json(items);
        } catch (e) {
            res.json(e.message)
        }
    },

    getOneEstablishments: async (req, res) => {
        try {
            const model = db.getModel('Establishment');

            const item = await model.findAll({where: {establishment_id: req.params.id}});

            res.json(item);
        } catch (e) {
            res.json(e.message);
        }
    },

    createEstablishments: async (req, res) => {
        try {
            const model = db.getModel('Establishment');

            const photos = req.files;

            let {location, user_id} = req.body;

            let {title, type, tags, start_work, end_work, phone} = JSON.parse(req.body.data);

            tags = tags.split(',');

            const createdEst = await model.create({
                title,
                type,
                start_work,
                end_work,
                tags,
                location,
                phone,
                user_id
            });

            const {establishment_id} = createdEst.dataValues;

            await postEstablishmentPhotos(user_id, establishment_id, photos, model);

            res.status(200).json(createdEst);
        } catch (e) {
            return res.status(400).json(e.message);
        }
    },

    deleteEstablishment: async (req, res) => {
        try {
            const model = db.getModel('Establishment');

            await model.destroy({where: {establishment_id: req.params.id}});

            res.json('Deleted')
        } catch (e) {
            res.json(e.message)
        }
    },

    updateEstablishment: async (req, res) => {
        try {
            const model = db.getModel('Establishment');

            const {location, user_id,} = req.body;

            const {approved} = req.body;

            let updated=[];

            if (req.body.data) {
                const {title, type, tags, start_work, end_work, phone} = JSON.parse(req.body.data);
               updated = await model.update({
                    title,
                    type,
                    tags,
                    start_work,
                    end_work,
                    location,
                    phone
                }, {where: {establishment_id: req.params.id}, returning: true, plain: true});
            }

            if(approved){
                await model.update({...req.body}, {where: {establishment_id: req.params.id}, returning: true, plain: true});
            }

            if (req.files) {
                await updateEstablishmentPhotos(user_id, updated[1].dataValues.establishment_id, req.files, model);
            }

            res.json('updated');
        } catch (e) {
            console.log(e.message);
            res.json(e.message);
        }
    },

    getTypeEstablishments: async (req, res) => {
        try {
            const model = db.getModel('Type_Establishments');

            const types = await model.findAll({});

            res.json(types);
        } catch (e) {
            res.json(e);
        }
    }
}
;
