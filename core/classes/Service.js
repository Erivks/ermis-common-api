import ApiException from '../exceptions/ApiException.js';
import { HTTP_CODE, LOG_LEVEL } from "../constants/main.js";
import { validationResult } from "express-validator";
import logger from '../functions/logger.js';

class Service {
    constructor(repository) {
        this.repository = repository;
    }

    async create(req) {
        logger(LOG_LEVEL.LOG_INFO, "Start - Service::create")

        const result = this.repository.create(req);

        return result;
    }

    async findAll() {
        logger(LOG_LEVEL.LOG_INFO, "Start - Service::findAll");
        
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
        logger(LOG_LEVEL.LOG_INFO, "Start - Service::findBy");
        
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

    async findManyBy(param) {
        logger(LOG_LEVEL.LOG_INFO, "Start - Service::findManyBy");
        
        const result = await this.repository.findManyBy(param);
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
        logger(LOG_LEVEL.LOG_INFO, "Start - Service::findByID")

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

    async updateBy(req) {
        logger(LOG_LEVEL.LOG_INFO, "Start - Service::updateBy");

        const body      = this.validateRequest(req);
        const params    = this.validateParams(req);
        const object    = this.getValueForUpdate(params);

        await this.repository.updateBy(object, body);

        //this.checkUpdateResult(result);
        return { status: HTTP_CODE.OK, message: "Updated Sucessfully!" }
    }

    async deleteByID(req) {
        logger(LOG_LEVEL.LOG_INFO, "Start - Service::deleteByID");

        //const params = this.validateParams(req);
        await this.repository.deleteByID(obj);

        return { status: HTTP_CODE.OK, message: "Deleted!" };
    }

    validateRequest(req) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new ApiException(
                HTTP_CODE.BAD_REQUEST,
                errors.mapped()
            );
        }

        if (this.isEmptyObject(req.body)) {
            throw new ApiException(
                HTTP_CODE.BAD_REQUEST,
                "Body is empty"
            );
        }

        return req.body;
    }

    validateParams(req) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new ApiException(
                HTTP_CODE.BAD_REQUEST,
                errors.mapped()
            );
        }

        if (!req.params) {
            throw new ApiException(
                HTTP_CODE.BAD_REQUEST,
                "Params is empty"
            );
        }

        return req.params;
    }

    getValueForUpdate(params) {
        switch (Object.keys(params)[0]) {
            case 'id':
                return { id: params.id }
            case 'cnpj':
                return { cnpj: params.cnpj }
        }
    }

    checkUpdateResult(result) {
        if (typeof result == "object" && result[0] === 0) {
            logger(LOG_LEVEL.LOG_ERR, `Row affected for updateBy: ${JSON.stringify(result)}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                "Update failed"
            );
        }
    }

    isEmptyObject(obj) {
        return JSON.stringify(obj) === '{}'
    }
}

export default Service;