import ResponsibleModel from "../model/ResponsibleModel.js";
import ApiException from '../../../../../core/exceptions/ApiException.js';
import logger from '../../../../../core/functions/logger.js';
import { HTTP_CODE, LOG_LEVEL } from "../../../../../core/constants/main.js";
import Repository from "../../../../../core/classes/Repository.js";

class ResponsibleRepository extends Repository {}

export default new ResponsibleRepository(ResponsibleModel);