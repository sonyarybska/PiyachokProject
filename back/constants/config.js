module.exports = {
    PORT: process.env.PORT || '4000',
    DbName: process.env.DbName || 'postgres',
    DbPassword: process.env.DbPassword || ' 1111',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_word',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret_word_refresh',
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:3000'
}
