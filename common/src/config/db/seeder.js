import BusinessModel from "../../modules/business/model/BusinessModel.js";
import BranchModel from "../../modules/branch/model/BranchModel.js";
import { LOG_LEVEL } from '../../../../core/constants/main.js'
import logger from '../../../../core/functions/logger.js';

class Entity {
    async business() {
        await BusinessModel.sync();
        
        BusinessModel.create({
            cnpj: "12345678910112",
            name: "Demo",
            address: "Rua Carlos Henrique",
            number: "11",
            district: "Miguel Couto",
            city: "Nova Iguaçu",
            state: "RJ",
            complement: "Atrás da Clinica da Familia"
        });
    }

    async branch() {
        await BranchModel.sync();
        
        BranchModel.create({
            cnpj: "12345678910114",
            address: "Rua Carlos Henrique",
            number: "11",
            district: "Miguel Couto",
            city: "Nova Iguaçu",
            state: "RJ",
            complement: "Atrás da Clinica da Familia",
            id_business: 1
        });
    }
}

export default async function seed() {
    try {
        const entity = new Entity();
        await entity.business();
        await entity.branch();
    } catch (error) {
        logger(LOG_LEVEL.LOG_ERR, error.message);
    }
}