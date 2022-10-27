import ApiException from '../../../../../core/exceptions/ApiException.js';
import { validationResult } from "express-validator";
import { HTTP_CODE, LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';
import Service from '../../../../../core/classes/Service.js';
import BranchRepository from '../repository/BranchRepository.js';
import BusinessRepository from '../../business/repository/BusinessRepository.js';

class BranchService extends Service {
    async create(req) {
        const reqValidate = this.validateRequest(req);
        
        const business = await BusinessRepository.findByID(reqValidate.id_business);
        if (!business) {
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                "id_business informed not exists"
            );
        }

        
        logger(LOG_LEVEL.LOG_WARN, business);
        return {};
    }

    getValueForUpdate(params) {
        switch (Object.keys(params)[0]) {
            case 'id':
                return { id_branch: params.id }
            case 'cnpj':
                return { cnpj: params.cnpj }
        }
    }
}

export default new BranchService(BranchRepository);