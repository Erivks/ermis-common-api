import { Router } from 'express';
import Controller from '../../../../../core/classes/Controller.js';
import BusinessController from '../controller/BusinessController.js';
import BusinessValidator from '../validator/BusinessValidator.js';

const router = new Router();
const baseUrl = "/api/business";

//== CREATE ==
router.post(`${baseUrl}/create`, BusinessValidator.create(), BusinessController.create.bind(BusinessController));

//== READ ==
router.get(`${baseUrl}/findAll`, BusinessController.findAll.bind(BusinessController));
router.get(`${baseUrl}/findByID/:id`, BusinessValidator.byID(), BusinessController.findByID.bind(BusinessController));

//== UPDATE ==
router.put(`${baseUrl}/updateByID/:id`, BusinessValidator.byID(), BusinessValidator.update(), BusinessController.updateByID.bind(BusinessController));
router.put(`${baseUrl}/updateByCNPJ/:cnpj`, BusinessValidator.byCNPJ(), BusinessValidator.update(), BusinessController.updateByCNPJ);

//== DELETE ==
router.delete(`${baseUrl}/deleteByID/:id`, BusinessValidator.byID(), BusinessController.deleteByID.bind(BusinessController));
export default router;