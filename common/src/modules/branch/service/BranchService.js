import ApiException from '../../../../../core/exceptions/ApiException.js';
import { validationResult } from "express-validator";
import { HTTP_CODE, LOG_LEVEL } from '../../../../../core/constants/main.js';
import logger from '../../../../../core/functions/logger.js';
import Service from '../../../../../core/classes/Service.js';
import BranchRepository from '../repository/BranchRepository.js';
import ResponsibleRepository from '../../responsible/repository/ResponsibleRepository.js';
import BusinessRepository from '../../business/repository/BusinessRepository.js';

class BranchService extends Service {
    async create(req) {
        logger(LOG_LEVEL, "Start - BranchService::create");

        const reqValidated  = this.validateRequest(req);
        const business      = await BusinessRepository.findByID(reqValidated.id_business);
        if (!business) {
            throw new ApiException(
                HTTP_CODE.INTERNAL_SERVER_ERROR,
                "id_business informed not exists"
            );
        }

        const responsibleID = await this.checkResponsible(reqValidated);

        // Prepara object para dar insert no banco
        if ("responsible" in reqValidated) {
            delete reqValidated.responsible;
        }

        reqValidated.id_responsible = responsibleID;

        let response = await BranchRepository.create(reqValidated);

        return response;
    }

    async checkResponsible(req) {
        const resposible    = req.id_responsible || req.responsible;

        if (typeof resposible === "object") {
            let response = await ResponsibleRepository.create(resposible);
            if (response.status !== HTTP_CODE.CREATED) {
                throw new ApiException(response.status, response.message);
            }
            response = JSON.parse(JSON.stringify(response.data));
            return response.id_responsible;
        } else if (typeof resposible === "number") {
            let response = await ResponsibleRepository.findByID(resposible);
            if (!response) {
                throw new ApiException(
                    HTTP_CODE.INTERNAL_SERVER_ERROR,
                    "id_responsible informed not exists"
                );
            }
            return resposible;
        }

        return resposible;
    }

    getValueForUpdate(params) {
        switch (Object.keys(params)[0]) {
            case 'id':
                return { id_branch: params.id }
            case 'cnpj':
                return { cnpj: params.cnpj }
        }
    }
}

export default new BranchService(BranchRepository);