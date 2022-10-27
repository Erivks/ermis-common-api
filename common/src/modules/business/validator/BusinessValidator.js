import { body, param } from 'express-validator';
import { LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';
import Validator from '../../../../../core/classes/Validator.js';

class BusinessValidator extends Validator {
    create() {
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessValidator::create");
        let validations = [
            body('cnpj')
                .isString()
                .withMessage('CNPJ must be a string')
                .isLength({ min: 14 })
                .withMessage('CNPJ must be 14 chars')
                .notEmpty()
                .withMessage('CNPJ must be informed'),
            body('company_name')
                .notEmpty()
                .withMessage('company_name must be informed')
                .isString()
                .withMessage('company_name must be a string')
                .isLength({ min: 1, max: 200 })
                .withMessage("Field 'company_name' length must be: [min: 1, max: 200]"),
            body('trading_name')
                .isString()
                .withMessage('trading_name must be a string')
                .optional(),
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

        validations.push(this.address());

        return validations;
    }

    update() {
        logger(LOG_LEVEL.LOG_INFO, "Running BusinessValidator::update");
        return [
            body('cnpj')
                .isString()
                .withMessage('CNPJ must be a string')
                .isLength({ min: 14 })
                .withMessage('CNPJ must be 14 chars')
                .optional(),
            body('name')
                .isString()
                .withMessage('name must be a string')
                .isLength({ min: 1, max: 200 })
                .withMessage("Length's name must be: [min: 1, max: 200]")
                .optional(),
            body('address')
                .isString()
                .isLength({ min: 5, max: 200 })
                .optional(),
            body('number')
                .isString()
                .isLength({ max: 10 })
                .optional(),
            body('district')
                .isString()
                .isLength({ max: 100 })
                .optional(),
            body('city')
                .isString()
                .isLength({ max: 100 })
                .optional(),
            body('state')
                .isString()
                .isLength({ min: 2 })
                .optional(),
            body('complement')
                .isString()
                .isLength({ max: 150 })
                .optional()
        ];
    }
}

export default new BusinessValidator();