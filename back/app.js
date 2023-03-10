const express = require('express');
const fileUpload = require('express-fileupload');
const path = require("path");
const cors = require("cors");
const swaggerUI = require('swagger-ui-express');
require('dotenv').config();

const cookieParser = require("cookie-parser");

const connection = require("./PgSql");
const {PORT, ALLOWED_ORIGIN} = require('./constants/config');
const swaggerJSON = require('./docs/swagger.json');

connection.getInstance().setModels();

const app = express();

const establishmentsRouter = require('./routers/establishments.router');
const userRouter = require('./routers/user.router');
const authRouter = require('./routers/auth.router');
const reviewRouter = require('./routers/review.router');
const favoriteRouter = require('./routers/favorite.router');

app.use(cookieParser());
app.use(cors({origin: ALLOWED_ORIGIN, credentials: true}));
app.options('*', cors({origin: ALLOWED_ORIGIN, credentials: true}));

app.use(express.json({limit: 10 * 1024 * 1024}));
app.use(express.raw({limit: 10 * 1024 * 1024}))
app.use(express.urlencoded({
    limit: 10 * 1024 * 1024,
    extended: true
}));

app.use(express.static(path.join(__dirname, 'static')));

app.use(fileUpload({}));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))
app.use('/establishments', establishmentsRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/reviews', reviewRouter);
app.use('/favorite', favoriteRouter);


app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 'GENERIC_ERROR')
        .json({message: err.message});
});

app.listen(PORT, async () => {
    try {
        console.log(`app listen ${PORT}`)
    } catch (error) {
        console.error(error);
    }
});