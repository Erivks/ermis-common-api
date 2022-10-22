import ApiException from '../exceptions/ApiException.js';
import { HTTP_CODE, LOG_LEVEL } from "../constants/main.js";
import logger from '../functions/logger.js';

class Repository {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        try {
            return await this.model.findAll();
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async findByID(id) {
        try {
            return await this.model.findByPk(id)
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async updateBy(object, body) {
        try {
            const result = await this.model.update(body, {
                where: object
            });

            return result;
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async deleteByID(id) {
        try {
            const result = await this.model.destroy({ where: { id_business: id }});
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

export default Repository;