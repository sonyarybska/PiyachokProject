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
        console.log(req.body);
        res.json('created');
    },

    getNewsByEstablishmentId: async (req,res)=>{
        res.json('sjjsj')
    },

    getNewsTypes: async (req, res)=>{
        const Type_News = db.getModel('Type_News');

        const types = await Type_News.findAll({});

        console.log(types);

        res.json(types);
    }
}