const db = require('../PgSql').getInstance();

module.exports = {
    checkFavoriteExist: async (req, res, next) => {
        try{
            const Favorite = db.getModel('Favorite');

            const {id} = req.params;

            const {establishment_id} = req.body;

            const favorite = await Favorite.findOne({where: {establishment_id, user_id: id}});

            if (favorite) {
                return;
            }
            next();
        }
      catch (e){
            next(e);
      }
    }
}
