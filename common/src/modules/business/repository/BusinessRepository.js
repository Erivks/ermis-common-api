import BusinessModel from "../model/BusinessModel.js";
import Repository from '../../../../../core/classes/Repository.js';
import ApiException from '../../../../../core/exceptions/ApiException.js';
import logger from '../../../../../core/functions/logger.js';
import { HTTP_CODE, LOG_LEVEL } from "../../../../../core/constants/main.js";

class BusinessRepository extends Repository {
    async create(body) {
        try {
            await this.model.create(body, {
                include: [{
                    association: BusinessModel.Responsible,
                    as: 'responsible'
                }]
            });
        } catch (error) {
            let msg = error.original ? error.original.sqlMessage : error.message;
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${msg}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                msg
            );
        }
    }

    async updateByCNPJ(cnpj, body) {
        try {
            const result = await this.model.update(body, { where: { cnpj: cnpj }});
            return result;
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }
}

export default new BusinessRepository(BusinessModel);