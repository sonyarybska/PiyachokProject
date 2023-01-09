const db = require('../PgSql').getInstance();

module.exports = {
    getReviewsByEstablishmentId: async (req, res) => {
        try {
            const {id} = req.params;
            console.log(id);
            const model = db.getModel('Review');
            const User = db.getModel('User');

            const response = await model.findAll({where: {establishment_id: +id}, include: User});

            res.json(response);
        } catch (e) {
            res.json(e.message);
        }
    },

    postReview: async (req, res) => {
        const model = db.getModel('Review');
        console.log(req.body);
        const created = await model.create({...req.body});

        res.json(created);
    }
}