import ApiException from '../exceptions/ApiException.js';
import { HTTP_CODE, LOG_LEVEL } from "../constants/main.js";
import logger from '../functions/logger.js';

class Repository {
    constructor(model) {
        this.model = model;
    }

    async create(body) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running Repository::create");

            await this.model.create(body);
            return { status: HTTP_CODE.CREATED, message: "Created Successfully!"};
            
        } catch (error) {
            let msg = error.original ? error.original.sqlMessage : error.message;
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${msg}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                msg
            );
        }
    }

    async findAll() {
        logger(LOG_LEVEL.LOG_INFO, "Running Repository::findAll");

        try {
            return await this.model.findAll();
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.name == "SequelizeDatabaseError" ? "Erro ao conectar ao banco de dados" : error.message
            );
        }
    }

    async findByID(id) {
        try {
            return await this.model.findByPk(id);
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async findBy(param) {
        try {
            return await this.model.findOne({ where: param });
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, `ERROR - ${error.message}`);
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                error.message
            );
        }
    }

    async findManyBy(param) {
        try {
            return await this.model.findAndCountAll({ where: param });
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