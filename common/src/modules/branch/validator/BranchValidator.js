import { body, param } from 'express-validator';
import { LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';
import Validator from '../../../../../core/classes/Validator.js';

class BranchValidator extends Validator {
    create() {
        logger(LOG_LEVEL.LOG_INFO, "Running BranchValidator::create");

        let validations = [
            body('cnpj')
                .isString()
                .withMessage('CNPJ must be a string')
                .isLength({ min: 14 })
                .withMessage('CNPJ must be 14 chars')
                .notEmpty()
                .withMessage('CNPJ must be informed'),
            body("id_responsible")
                .optional()
                .isNumeric()
                .withMessage("id_responsible must be numeric"),
            body("id_business")
                .notEmpty()
                .withMessage('id_business must be informed')
                .isNumeric()
        ];

        validations.push(this.responsibleOptional());
        validations.push(this.address());

        return validations;
    }
}

export default new BranchValidator();