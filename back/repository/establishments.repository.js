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
                filterByCheck = null,
                approved = null,
                rejected = null,
                pending = null
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
                establishments = await Establishment.findAll({
                    where: findObj, limit,
                    offset: (page - 1) * limit
                })
            } else if (approved && !filterByRating && !filterByCheck && !sort && !type) {
                establishments = await Establishment.findAll({
                    where: {approved:true},
                    limit,
                    offset: (page - 1) * limit
                })
            } else if (pending && !filterByRating && !filterByCheck && !sort && !type) {
                establishments = await Establishment.findAll({
                    where: {pending:true},
                    limit,
                    offset: (page - 1) * limit
                })
            } else if (rejected && !filterByRating && !filterByCheck && !sort && !type) {
                establishments = await Establishment.findAll({
                    where: {rejected:true},
                    limit,
                    offset: (page - 1) * limit
                })
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
                    where: {type, average_check: {[Op.between]: betweenCheck}},
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
                })

            } else if (type && filterByRating && !filterByCheck && sort) {
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
                    where: {type, approved: true},
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

                establishments = await Establishment.findAll({where: {type}, limit, offset: (page - 1) * limit});
            } else {
                establishments = await Establishment.findAll({limit, offset: (page - 1) * limit});
            }

            const count = await Establishment.count();

            const maxCheck = await Establishment.max('average_check');

            return {
                establishments, count, maxCheck
            }
        } catch (e) {
            throw new ApiError(e.message, 400);
        }

    },

    findByUserId: async (query, id) => {
        try {
            const Establishment = db.getModel('Establishment');

            const {
                limit = 12,
                page = 1,
                approved = false,
                rejected = false,
                pending = false
            } = query;

            let establishments;
            let count;

            if (approved) {
                establishments = await Establishment.findAll({
                    where: {approved: true, user_id: id}, limit,
                    offset: (page - 1) * limit
                })
                count = await Establishment.count({where: {user_id: id, approved: true}});
            } else if (rejected) {
                establishments = await Establishment.findAll({
                    where: {rejected: true, user_id: id}, limit,
                    offset: (page - 1) * limit
                })
                count = await Establishment.count({where: {user_id: id, rejected: true}});
            } else if (pending) {
                establishments = await Establishment.findAll({
                    where: {pending: true, user_id: id}, limit,
                    offset: (page - 1) * limit
                })
                count = await Establishment.count({where: {user_id: id, pending: true}});
            } else {
                establishments = (await Establishment.findAll({
                    where: {user_id: id},
                    limit,
                    offset: (page - 1) * limit
                }));
                count = await Establishment.count({where: {user_id: id}});
            }

            return {
                establishments, count
            }
        } catch (e) {
            throw new ApiError(e.message, 400);
        }
    }
}