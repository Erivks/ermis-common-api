import { Router } from 'express';
import ResponsibleController from '../controller/ResponsibleController.js';
import ResponsibleValidator from '../validator/ResponsibleValidator.js';

const router = new Router();
const baseUrl = "/api/responsible";

//== CREATE ==
//router.post(`${baseUrl}/create`, BusinessValidator.create(), BusinessController.create);

//== READ ==
router.get(`${baseUrl}/findByBusinessID/:id`, ResponsibleValidator.byID(), ResponsibleController.findByBusinessID);
router.get(`${baseUrl}/findByBusinessCNPJ/:cnpj`, ResponsibleValidator.byCNPJ(), ResponsibleController.findByBusinessCNPJ);
//router.get(`${baseUrl}/findAll`, BusinessController.findAll);

//== UPDATE ==
//router.put(`${baseUrl}/updateByID/:id`, BusinessValidator.byID(), BusinessValidator.update(), BusinessController.updateByID);
//router.put(`${baseUrl}/updateByCNPJ/:cnpj`, BusinessValidator.byCNPJ(), BusinessValidator.update(), BusinessController.updateByCNPJ);

//== DELETE ==
//router.delete(`${baseUrl}/deleteByID/:id`, BusinessValidator.byID(), BusinessController.deleteByID);
export default router;