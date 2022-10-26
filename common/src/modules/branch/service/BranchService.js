import ApiException from '../../../../../core/exceptions/ApiException.js';
import BusinessRepository from '../repository/BusinessRepository.js';
import { validationResult } from "express-validator";
import { HTTP_CODE, LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';
import Service from '../../../../../core/classes/Service.js';

class BranchService extends Service {
    getValueForUpdate(params) {
        switch (Object.keys(params)[0]) {
            case 'id':
                return { id_branch: params.id }
            case 'cnpj':
                return { cnpj: params.cnpj }
        }
    }
}

export default new BranchService(BusinessRepository);