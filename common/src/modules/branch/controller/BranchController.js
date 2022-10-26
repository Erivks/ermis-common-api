import BusinessService from "../service/BusinessService.js";
import logger from "../../../../../core/functions/logger.js";
import { HTTP_CODE, LOG_LEVEL } from "../../../../../core/constants/main.js";
import Controller from "../../../../../core/classes/Controller.js";
import BranchService from "../service/BranchService.js";

class BranchController extends Controller {

    async findAllByBusinessID(req, res) {
        logger(LOG_LEVEL.LOG_INFO, "Running BranchController::findAllByBusinessID");
        
        try {
            let params = BranchService.validateParams(req);
            let response = await BranchService.findManyBy({ id_business: params.id });
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            return res.status(response.status).json(response);
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

export default new BranchController(BusinessService);