const {Op} = require("sequelize");
const sequelize = require("sequelize");
const {ApiError} = require("../errors/ApiError");
const db = require('../PgSql').getInstance();

module.exports = {
    find: async (query) => {
        try {
            const Establishment = db.getModel('Establishment');
            const Review = db.getModel('Review');

            const {
                limit = 12,
                page = 1,
                title,
                sort = null,
                type = null,
                filterByRating = null,
                filterByCheck = null
            } = query;


            let betweenCheck;
            let betweenRating;

            if (filterByCheck) {
                betweenCheck = filterByCheck.split('-')[1].split(',').map(i => Number(i));
            }

            if (filterByRating) {
                betweenRating = filterByRating.split('-')[1].split(',').map(i => Number(i));
            }


            let findObj = {};

            let establishments;

            if (title) {
                findObj = {...findObj, title: {[Op.iRegexp]: title,}};
                establishments = await Establishment.findAll({where: findObj});

            } else if (filterByRating && !filterByCheck && !sort && !type) {
                establishments = (await Establishment.findAll({
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    include: [{
                        model: Review, as: 'review',
                        attributes: [],
                    }],
                    having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                    group: sequelize.col('establishment.establishment_id'),
                    limit,
                    subQuery: false,
                    offset: (page - 1) * limit
                }))

            } else if (filterByCheck && !filterByRating && !sort && !type) {
                establishments = await Establishment.findAll({
                    where: {average_check: {[Op.between]: betweenCheck}},
                    limit,
                    offset: (page - 1) * limit
                });

            } else if (filterByRating && filterByCheck && !type && !sort) {
                establishments = await Establishment.findAll({
                    where: {average_check: {[Op.between]: betweenCheck}},
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    include: [{
                        model: Review, as: 'review',
                        attributes: [],
                    }],
                    having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                    group: sequelize.col('establishment.establishment_id'),
                    limit,
                    subQuery: false,
                    offset: (page - 1) * limit
                })

            } else if (sort && !type && !filterByRating && !filterByCheck) {
                establishments = await Establishment.findAll({
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    },],
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    group: [sequelize.col('establishment.establishment_id')],
                    order: [sort.split('-')],
                    limit,
                    subQuery: false,
                    offset: (page - 1) * limit
                })

            } else if (sort && !type && filterByRating && !filterByCheck) {
                establishments = await Establishment.findAll({
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    },],
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    group: [sequelize.col('establishment.establishment_id')],
                    having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                    order: [sort.split('-')],
                    limit,
                    subQuery: false,
                    offset: (page - 1) * limit
                })

            } else if (sort && !type && !filterByRating && filterByCheck) {
                establishments = await Establishment.findAll({
                    where: {average_check: {[Op.between]: betweenCheck}},
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    },],
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    group: [sequelize.col('establishment.establishment_id')],
                    order: [sort.split('-')],
                    limit,
                    subQuery: false,
                    offset: (page - 1) * limit
                })

            } else if (sort && !type && filterByRating && filterByCheck) {
                establishments = await Establishment.findAll({
                    where: {average_check: {[Op.between]: betweenCheck}},
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    },],
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                    group: [sequelize.col('establishment.establishment_id')],
                    order: [sort.split('-')],
                    limit,
                    subQuery: false,
                    offset: (page - 1) * limit
                })

            } else if (sort && type && !filterByRating && !filterByCheck) {
                establishments = await Establishment.findAll({
                    where: {type},
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    },],
                    subQuery: false,
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    group: [sequelize.col('establishment.establishment_id')],
                    order: [sort.split('-')],
                    limit,
                    offset: (page - 1) * limit
                });
            } else if (type && filterByRating && filterByCheck && sort) {
                establishments = await Establishment.findAll({
                    where: {type, average_check: {[Op.between]: betweenCheck}},
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    }],
                    subQuery: false,
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    group: [sequelize.col('establishment.establishment_id')],
                    having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                    order: [sort.split('-')],
                    limit,
                    offset: (page - 1) * limit
                })

            } else if (type && filterByRating && !filterByCheck && !sort) {
                establishments = await Establishment.findAll({
                    where: {type},
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    }],
                    subQuery: false,
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    group: [sequelize.col('establishment.establishment_id')],
                    having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                    limit,
                    offset: (page - 1) * limit
                })

            } else if (type && !filterByRating && filterByCheck && !sort) {
                establishments = await Establishment.findAll({
                    where: {type, average_check: {[Op.between]: betweenCheck}},
                    limit,
                    offset: (page - 1) * limit
                })

            } else if (type && filterByRating && filterByCheck && !sort) {
                establishments = await Establishment.findAll({
                    where: {
                        type, average_check: {[Op.between]: betweenCheck},
                        include: [{
                            model: Review, as: 'review', attributes: [],
                        },],
                        subQuery: false,
                        attributes: {
                            include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                            exclude: []
                        },
                        group: [sequelize.col('establishment.establishment_id')],
                        having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                        limit,
                        offset: (page - 1) * limit
                    }
                })

            } else if (type && !filterByRating && filterByCheck && sort) {
                establishments = await Establishment.findAll({
                    where: {
                        type, average_check: {[Op.between]: betweenCheck},
                        include: [{
                            model: Review, as: 'review', attributes: [],
                        },],
                        subQuery: false,
                        attributes: {
                            include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                            exclude: []
                        },
                        group: [sequelize.col('establishment.establishment_id')],
                        order: [sort.split('-')],
                        limit,
                        offset: (page - 1) * limit
                    }
                })

            } else if (type && filterByRating && !filterByCheck && sort) {
                console.log('jhh')
                establishments = await Establishment.findAll({
                    where: {type},
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    },],
                    subQuery: false,
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    group: [sequelize.col('establishment.establishment_id')],
                    order: [sort.split('-')],
                    having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                    limit,
                    offset: (page - 1) * limit
                })

            } else if (type && filterByRating && filterByCheck && sort) {
                establishments = await Establishment.findAll({
                    where: {type},
                    include: [{
                        model: Review, as: 'review', attributes: [],
                    },],
                    subQuery: false,
                    attributes: {
                        include: [[sequelize.fn('coalesce', sequelize.fn('AVG', sequelize.col('review.rating')), 1), 'avgRating']],
                        exclude: []
                    },
                    group: [sequelize.col('establishment.establishment_id')],
                    having: sequelize.literal(`coalesce(AVG("review"."rating"), 1)  between ${betweenRating[0]} and ${betweenRating[1]}`),
                    order: [sort.split('-')],
                    limit,
                    offset: (page - 1) * limit
                })

            } else if (type && type.length && !sort && !filterByRating && !filterByCheck) {
                console.log('ksks');
                establishments = await Establishment.findAll({where: {type}, limit, offset: (page - 1) * limit});
            } else {
                establishments = (await Establishment.findAll({limit, offset: (page - 1) * limit}));
            }

            const count = await Establishment.count();

            const maxCheck = await Establishment.max('average_check');

            return {
                establishments, page, count, maxCheck
            }
        } catch (e) {
            throw new ApiError(e.message, 400);
        }

    }
}