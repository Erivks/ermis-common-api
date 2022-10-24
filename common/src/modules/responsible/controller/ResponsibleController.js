import ResponsibleService from "../service/ResponsibleService.js";
import BusinessService from "../../business/service/BusinessService.js";
import logger from "../../../../../core/functions/logger.js";
import { HTTP_CODE, LOG_LEVEL } from "../../../../../core/constants/main.js";
import ApiException from "../../../../../core/exceptions/ApiException.js";
import Controller from "../../../../../core/classes/Controller.js";

class ResponsibleController extends Controller {
    async findByBusinessID(req, res) {
        logger(LOG_LEVEL.LOG_INFO, "Running ResponsibleController::findByBusinessID");
        
        try {
            let response            = await BusinessService.findByID(req.params.id);
            const id_responsible    = response.message.id_responsible ?? null;
            if (!id_responsible) {
                throw new ApiException(500, `ERROR - Could not find Responsible to Bussiness: ${req.params.id}`);
            }
            let responsible         = await ResponsibleService.findByID(id_responsible);
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(responsible)}`);
            return res.status(responsible.status).json(responsible);
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, error.message);
            let status = error.status || HTTP_CODE.INTERNAL_SERVER_ERROR;
            let response = {
                status: status,
                message: error.message
            };
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            return res.status(status).json(response);
        }
    }

    async findByBusinessCNPJ(req, res) {
        logger(LOG_LEVEL.LOG_INFO, "Running ResponsibleController::findByBusinessCNPJ");

        try {
            const cnpj              = req.params.cnpj;
            let response            = await BusinessService.findBy({ cnpj: cnpj });
            const id_responsible    = response.message.id_responsible ?? null;
            if (!id_responsible) {
                throw new ApiException(500, `ERROR - Could not find Responsible to Bussiness: ${req.params.cnpj}`);
            }
            let responsible         = await ResponsibleService.findByID(id_responsible);
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(responsible)}`);
            return res.status(responsible.status).json(responsible);
        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, error.message);
            let status = error.status || HTTP_CODE.INTERNAL_SERVER_ERROR;
            let response = {
                status: status,
                message: error.message
            };
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            return res.status(status).json(response);
        }
    }
}

export default new ResponsibleController(ResponsibleService);