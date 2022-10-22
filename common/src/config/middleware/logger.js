import { LOG_LEVEL } from '../../../../core/constants/main.js';
import logger from '../../../../core/functions/logger.js';

export default function middlewareLogger(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    logger(LOG_LEVEL.LOG_INFO, `Endpoint called: ${req.path} - IP: ${ip}`);
    if (req.body) {
        logger(LOG_LEVEL.LOG_INFO, `Body Request: ${JSON.stringify(req.body)}`);
    }
    next();
}