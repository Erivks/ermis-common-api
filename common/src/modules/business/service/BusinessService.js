import ApiException from '../../../../../core/exceptions/ApiException.js';
import BusinessRepository from '../repository/BusinessRepository.js';
import { validationResult } from "express-validator";
import { HTTP_CODE, LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';
import Service from '../../../../../core/classes/Service.js';

class BusinessService extends Service {
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
}

export default new BusinessService(BusinessRepository);