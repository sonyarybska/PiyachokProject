const Joi = require('joi');

const createEstablishmentValidator = Joi.object({
    title: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    type: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    tags: Joi.string(),

    start_work: Joi.string()
        .trim()
        .required(),

    end_work: Joi.string()
        .trim()
        .required(),

    average_check: Joi.number(),

    'photosName': Joi.array(),

    location: Joi.string()
        .trim()
        .min(3)
        .max(100),

    phone: Joi.string()
        .trim()
        .required()
        .regex(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/i),

    user_id: Joi.number()
        .required()
});

const updateEstablishmentValidator = Joi.object({
    title: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    type: Joi.string()
        .min(2)
        .max(30)
        .trim()
        .required(),

    tags: Joi.array(),

    start_work: Joi.string()
        .trim()
        .required(),

    end_work: Joi.string()
        .trim()
        .required(),

    average_check: Joi.number(),

    photosName: Joi.array(),

    location: Joi.string()
        .trim()
        .min(3)
        .max(100),

    phone: Joi.string()
        .trim()
        .required()
        .regex(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/i),

    user_id: Joi.number()
        .required(),

    avatar: Joi.string(),

});

module.exports = {createEstablishmentValidator, updateEstablishmentValidator};