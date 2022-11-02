import BusinessModel from "../../modules/business/model/BusinessModel.js";
import BranchModel from "../../modules/branch/model/BranchModel.js";
import { LOG_LEVEL } from '../../../../core/constants/main.js'
import logger from '../../../../core/functions/logger.js';
import ResponsibleModel from "../../modules/responsible/model/ResponsibleModel.js";

class Entity {
    async business() {
        await BusinessModel.sync();
        
        BusinessModel.create({
            cnpj: "12345678910112",
            company_name: "Demo",
            trading_name: "Demo",
            address: "Rua Carlos Henrique",
            number: "11",
            district: "Miguel Couto",
            city: "Nova Iguaçu",
            state: "RJ",
            complement: "Atrás da Clinica da Familia",
            id_responsible: 1
        });
    }

    async responsible() {
        await ResponsibleModel.sync();

        ResponsibleModel.create({
            name: "Erick Oliveira",
            telephone: "21966757404",
            cpf: "19712566765"
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

async function seed() {
    try {
        const entity = new Entity();
        await entity.responsible();
        await entity.business();
        await entity.branch();
    } catch (error) {
        logger(LOG_LEVEL.LOG_ERR, error.message);
    }
}

seed();