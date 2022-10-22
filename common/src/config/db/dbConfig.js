import dotenv from 'dotenv';
import { LOG_LEVEL } from '../../../../core/constants/main.js'
import { Sequelize } from 'sequelize';
import logger from '../../../../core/functions/logger.js';

const env = dotenv.config().parsed;
const db = new Sequelize(env.DB, env.USER, env.PASS, {
    host: env.HOST,
    dialect: env.DIALECT,
    port: env.PORT,
    define: {
        freezeTableName: true
    },
    logging: (msg) => {
        logger(LOG_LEVEL.LOG_DEBUG, `Sequelize: ${msg}`);
    }
});

await db.authenticate().then(() => {
    logger(LOG_LEVEL.LOG_INFO, "Connection with db has been established!");
}).catch((err) => {
    logger(LOG_LEVEL.LOG_ERR, err.message);
    throw new Error(err.message);
});

export default db;