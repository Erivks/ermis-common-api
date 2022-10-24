import ApiException from '../exceptions/ApiException.js';
import { HTTP_CODE, LOG_LEVEL } from "../constants/main.js";
import logger from '../functions/logger.js';

class Controller {
    constructor(service) {
        this.service = service;
    }

    async updateByID(req, res) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running Controller::updateByID");
            const result = await this.service.updateBy(req);
            let response = {
                status: result.status,
                message: "Updated successfully!"
            };
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            res.status(result.status).json(response);
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, error.message);
            let status = error.status || HTTP_CODE.INTERNAL_SERVER_ERROR;
            let response = {
                status: status,
                message: error.message
            };
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            return res.status(status).json(response);
        }
    }
   
}

export default Controller;