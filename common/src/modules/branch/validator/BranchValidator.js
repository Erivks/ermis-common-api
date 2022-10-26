import { body, param } from 'express-validator';
import { LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';
import Validator from '../../../../../core/classes/Validator.js';

class BranchValidator extends Validator {}

export default new BranchValidator();