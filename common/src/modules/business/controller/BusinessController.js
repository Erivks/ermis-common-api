import BusinessService from "../service/BusinessService.js";
import logger from "../../../../../core/functions/logger.js";
import { HTTP_CODE, LOG_LEVEL } from "../../../../../core/constants/main.js";
import Controller from "../../../../../core/classes/Controller.js";

class BusinessController extends Controller {

    async updateByCNPJ(req, res) {
        try {
            logger(LOG_LEVEL.LOG_INFO, "Running BusinessController::updateByCNPJ");

            const result = await BusinessService.updateBy(req);
            const response = {
                status: result.status,
                message: "Update successfully!"
            };
            logger(LOG_LEVEL.LOG_INFO, `Response: ${JSON.stringify(response)}`);
            res.status(result.status).json(response);

        } catch (error) {
            logger(LOG_LEVEL.LOG_ERR, error.message);
            let status = error.status || HTTP_CODE.INTERNAL_SERVER_ERROR;
            return res.status(status).json({
                status: status,
                message: error.message
            });
        }
    }
}

export default new BusinessController(BusinessService);