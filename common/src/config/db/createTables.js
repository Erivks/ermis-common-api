import BusinessModel from "../../modules/business/model/BusinessModel.js";
import ResponsibleModel from "../../modules/responsible/model/ResponsibleModel.js";
import { LOG_LEVEL } from '../../../../../core/common/constants/main.js';
import logger from '../../../../../core/common/functions/logger.js';

try {
    const options = { force: true };
    await ResponsibleModel.sync(options);
    await BusinessModel.sync(options);
} catch (error) {
    logger(LOG_LEVEL.LOG_ERR, error.message);
}
