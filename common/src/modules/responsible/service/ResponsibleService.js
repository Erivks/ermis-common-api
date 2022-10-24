import ResponsibleRepository from "../repository/ResponsibleRepository.js";
import Service from "../../../../../core/classes/Service.js";
import { LOG_LEVEL, HTTP_CODE } from "../../../../../core/constants/main.js";
import logger from "../../../../../core/functions/logger.js";

class ResponsibleService extends Service {
    getValueForUpdate(params) {
        switch (Object.keys(params)[0]) {
            case 'id':
                return { id_responsible: params.id }
            case 'cnpj':
                return { cnpj: params.cnpj }
        }
    }
}

export default new ResponsibleService(ResponsibleRepository);