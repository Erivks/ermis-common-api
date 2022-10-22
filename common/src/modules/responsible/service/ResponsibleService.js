import ResponsibleRepository from "../repository/ResponsibleRepository";
import { LOG_LEVEL } from "../../../../../../common/constants/main";
import logger from "../../../../../../common/functions/logger";

class ResponsibleService {
    async create(req) {
        logger(LOG_LEVEL.LOG_INFO, "Running ResponsibleService::create")

        const result = ResponsibleRepository.create(req);

        return result;
    }
}