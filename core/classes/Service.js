import ApiException from '../exceptions/ApiException.js';
import { HTTP_CODE, LOG_LEVEL } from "../constants/main.js";
import logger from '../functions/logger.js';

class Service {
    constructor(repository) {
        this.repository = repository;
    }

    async create(req) {
        logger(LOG_LEVEL.LOG_INFO, "Running Service::create")

        const result = this.repository.create(req);

        return result;
    }

    async findAll() {
        logger(LOG_LEVEL.LOG_INFO, "Running Service::findAll");
        
        let result = await this.repository.findAll();
        if (!result) {
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR, 
                "Unable to get data!"
            );
        }
        return {
            status: HTTP_CODE.OK,
            result
        }
    }

    async findBy(param) {
        logger(LOG_LEVEL.LOG_INFO, "Running Service::findBy");
        
        const result = await this.repository.findBy(param);
        if (!result) {
            let msg = `Could not find by: ${JSON.stringify(param)}`;
            logger(LOG_LEVEL.LOG_WARN, msg); 
            return {
                status: HTTP_CODE.OK,
                message: msg
            }
        }
        return { 
            status: HTTP_CODE.OK,
            message: result
        };
    }

    async findByID(id) {
        logger(LOG_LEVEL.LOG_INFO, "Running Service::findByID")

        const result = await this.repository.findByID(id);
        if (!result) {
            let msg = `Could not find ID: ${id}`;
            logger(LOG_LEVEL.LOG_WARN, msg); 
            return {
                status: HTTP_CODE.OK,
                message: msg
            }
        }
        return { 
            status: HTTP_CODE.OK,
            message: result
        };
    }
}

export default Service;