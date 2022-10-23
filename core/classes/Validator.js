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
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessValidator::byCNPJ");
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
}

export default Validator;