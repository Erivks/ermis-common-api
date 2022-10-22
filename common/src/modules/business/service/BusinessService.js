import ApiException from '../../../../../core/exceptions/ApiException.js';
import BusinessRepository from '../repository/BusinessRepository.js';
import { validationResult } from "express-validator";
import { HTTP_CODE, LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';

class BusinessService {
    async findAll() {
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessService::findAll");
        
        let result = await BusinessRepository.findAll();
        if (!result) {
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR, 
                "Unable to get business data!"
            );
        }
        return {
            status: HTTP_CODE.OK,
            result
        }
    }

    async findByID(id) {
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessService::findByID");
        
        const result = await BusinessRepository.findByID(id);
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
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessService::updateBy");

        const body      = this.validateRequest(req);
        const params    = this.validateParams(req);
        const object    = this.getValueForUpdate(params);

        const result = await BusinessRepository.updateBy(object, body);

        this.checkUpdateResult(result);
        return { status: HTTP_CODE.OK }
    }

    getValueForUpdate(params) {
        switch (Object.keys(params)[0]) {
            case 'id':
                return { id_business: params.id }
            case 'cnpj':
                return { cnpj: params.cnpj }
        }
    }

    async create(req) {
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessService::create");

        const body = this.validateRequest(req);

        await BusinessRepository.create(body); 
        
        return { status: HTTP_CODE.CREATED };    
    }

    async deleteByID(req) {
        const params = this.validateParams(req);

        const result = await BusinessRepository.deleteByID(params.id);

        return { status: HTTP_CODE.OK };
    }

    checkUpdateResult(result) {
        if (typeof result == "object" && result[0] === 0) {
            logger(LOG_LEVEL.LOG_ERR, `Row affected for Business updateByID: ${JSON.stringify(result)}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                "Update failed"
            );
        }
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

    validateRequest(req) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            throw new ApiException(
                HTTP_CODE.BAD_REQUEST,
                errors.mapped()
            );
        }

        if (!req.body) {
            throw new ApiException(
                HTTP_CODE.BAD_REQUEST,
                "Body is empty"
            );
        }

        return req.body;

    }
}

export default new BusinessService();