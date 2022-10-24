import BusinessService from "../service/BusinessService.js";
import logger from "../../../../../core/functions/logger.js";
import { HTTP_CODE, LOG_LEVEL } from "../../../../../core/constants/main.js";
import Controller from "../../../../../core/classes/Controller.js";

class BusinessController extends Controller {
    async findAll(req, res) {
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessController::findAll");
        
        try {
            let response = await BusinessService.findAll();
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
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessController::findByID");

        try {
            const result = await BusinessService.findByID(req.params.id);
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

    async create(req, res) {
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessController::create");

        try {           
            const result = await BusinessService.create(req);
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

    async updateByCNPJ(req, res) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running BusinessController::updateByCNPJ");

            const result = await BusinessService.updateBy(req);
            const response = {
                status: result.status,
                message: "Update successfully!"
            };
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            res.status(result.status).json(response);

        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, error.message);
            let status = error.status || HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json({
                status: status,
                message: error.message
            });
        }
    }

    async deleteByID(req, res) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running BusinessController::deleteByID");
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

export default new BusinessController(BusinessService);