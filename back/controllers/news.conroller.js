const db = require('../PgSql').getInstance();

module.exports = {
    getNews: async (req, res) => {
        try {

            res.json('response');
        } catch (e) {
            res.json(e.message);
        }
    },

    createNews: async (req, res) => {

        res.json('created');
    },

    getNewsByEstablishmentId: async (req,res)=>{
        res.json('response')
    },

    getNewsTypes: async (req, res)=>{
        const Type_News = db.getModel('Type_News');

        const types = await Type_News.findAll({});

        res.json(types);
    }
}