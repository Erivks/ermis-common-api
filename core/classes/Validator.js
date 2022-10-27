import { body, param } from 'express-validator';
import { LOG_LEVEL } from '../constants/main.js';
import logger from '../functions/logger.js';

class Validator {
    byID() {
        logger(LOG_LEVEL.LOG_INFO, "Running Validator::byID");
        return [
            param('id')
                .notEmpty()
                .withMessage('param "id" must be present')
                .isNumeric()
                .withMessage('param "id" must be numeric')
        ];
    }

    byCNPJ() {
        logger(LOG_LEVEL.LOG_INFO, "Running Validator::byCNPJ");
        return [
            param('cnpj')
                .notEmpty()
                .withMessage('param "cnpj" must be present')
                .isLength({ min: 14 })
                .withMessage('CNPJ must contains 14 chars')
                .isNumeric()
                .withMessage('param "cnpj" must be numeric')
        ];
    }

    address() {
        logger(LOG_LEVEL.LOG_INFO, "Running Validator::address");
        return [
            body('address')
                .isString()
                .isLength({ min: 5, max: 200 })
                .notEmpty(),
            body('number')
                .isString()
                .isLength({ max: 10 })
                .notEmpty(),
            body('district')
                .isString()
                .isLength({ max: 100 })
                .notEmpty(),
            body('city')
                .isString()
                .isLength({ max: 100 })
                .notEmpty(),
            body('state')
                .isString()
                .isLength({ min: 2 })
                .notEmpty(),
            body('complement')
                .isString()
                .isLength({ max: 150 })
                .optional()
        ];
    }

    responsible() {
        logger(LOG_LEVEL.LOG_INFO, "Running Validator::responsible");
        return [
            body('responsible')
                .notEmpty()
                .isObject(),
            body('responsible.name')
                .notEmpty()
                .isString()
                .isLength({ max: 200 }),
            body('responsible.telephone')
                .notEmpty()
                .isString()
                .isNumeric()
                .isLength({ max: 15 }),
            body('responsible.cpf')
                .notEmpty()
                .isString()
                .isNumeric()
                .isLength({ min: 11 })
        ];
    }

    responsibleOptional() {
        logger(LOG_LEVEL.LOG_INFO, "Running Validator::responsibleOptional");
        return [
            body('responsible')
                .optional()
                .isObject(),
            body('responsible.name')
                .notEmpty()
                .isString()
                .isLength({ max: 200 }),
            body('responsible.telephone')
                .notEmpty()
                .isString()
                .isNumeric()
                .isLength({ max: 15 }),
            body('responsible.cpf')
                .notEmpty()
                .isString()
                .isNumeric()
                .isLength({ min: 11 })
        ];
    }
}

export default Validator;