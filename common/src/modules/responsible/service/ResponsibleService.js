import ResponsibleRepository from "../repository/ResponsibleRepository.js";
import Service from "../../../../../core/classes/Service.js";
import { LOG_LEVEL, HTTP_CODE } from "../../../../../core/constants/main.js";
import logger from "../../../../../core/functions/logger.js";

class ResponsibleService extends Service {}

export default new ResponsibleService(ResponsibleRepository);