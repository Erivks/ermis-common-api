import express from 'express';
import dotenv from 'dotenv';
import BusinessRoutes from './src/modules/business/routes/BusinessRoutes.js';
import middlewareLogger from './src/config/middleware/logger.js';
import logger from '../core/functions/logger.js';
import { LOG_LEVEL } from '../core/constants/main.js';

const app = express();
const env = dotenv.config().parsed;
const PORT = env.PORT_API || "8083";

app.use(express.json());
app.use(middlewareLogger);
app.use(BusinessRoutes);

app.get('/api/status', (req, res) => {
    return res.sendStatus(200).json({
        status: 200,
        message: "Common API ok!"
    });
});

app.listen(PORT, () => {
    logger(LOG_LEVEL.LOG_INFO, `Listening on port ${PORT}!`);
});