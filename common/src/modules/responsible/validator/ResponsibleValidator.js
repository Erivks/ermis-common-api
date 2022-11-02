import { body, param } from 'express-validator';
import { LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';
import Validator from '../../../../../core/classes/Validator.js';

class ResponsibleValidator extends Validator {
    update() {
        logger(LOG_LEVEL.LOG_INFO, "Start - ResponsibleValidator::update");
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

export default new ResponsibleValidator();