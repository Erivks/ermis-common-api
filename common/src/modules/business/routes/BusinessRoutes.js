import { Router } from 'express';
import BusinessController from '../controller/BusinessController.js';
import BusinessValidator from '../validator/BusinessValidator.js';

const router = new Router();
const baseUrl = "/api/business";

//== CREATE ==
router.post(`${baseUrl}/create`, BusinessValidator.create(), BusinessController.create);

//== READ ==
router.get(`${baseUrl}/findAll`, BusinessController.findAll);
router.get(`${baseUrl}/findByID/:id`, BusinessValidator.byID(), BusinessController.findByID);

//== UPDATE ==
router.put(`${baseUrl}/updateByID/:id`, BusinessValidator.byID(), BusinessValidator.update(), BusinessController.updateByID);
router.put(`${baseUrl}/updateByCNPJ/:cnpj`, BusinessValidator.byCNPJ(), BusinessValidator.update(), BusinessController.updateByCNPJ);

//== DELETE ==
router.delete(`${baseUrl}/deleteByID/:id`, BusinessValidator.byID(), BusinessController.deleteByID);
export default router;