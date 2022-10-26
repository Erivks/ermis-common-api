import { HTTP_CODE, LOG_LEVEL } from "../constants/main.js";
import logger from '../functions/logger.js';

class Controller {
    constructor(service) {
        this.service = service;
    }

    async create(req, res) {
        logger(LOG_LEVEL.LOG_INFO, "Running Controller::create");

        try {           
            const result = await this.service.create(req);
            let response = {
                status: result.status,
                message: result.message || "Created Successfully!"
            };

            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            return res.status(result.status).json(response);
            
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

    async findAll(req, res) {
        logger(LOG_LEVEL.LOG_INFO, "Running Controller::findAll");
        
        try {
            let response = await this.service.findAll();
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            return res.status(response.status).json(response);
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

    async findByID(req, res) {
        logger(LOG_LEVEL.LOG_INFO, "Running Controller::findByID");

        try {
            const result = await this.service.findByID(req.params.id);
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(result)}`);
            return res.status(result.status).json(result); 
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, error.message);
            let status = error.status || HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json({
                status: status,
                message: error.message
            });
        }
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

    async deleteByID(req, res) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running Controller::deleteByID");
            const result = await BusinessService.deleteByID(req);
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(result)}`);
            return res.status(result.status).json(result);
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, error.message);
            let status = error.status || HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json({
                status: status,
                message: error.message
            });
        }
    }
}

export default Controller;