import { Router } from 'express';
import ResponsibleController from '../controller/ResponsibleController.js';
import ResponsibleValidator from '../validator/ResponsibleValidator.js';

const router = new Router();
const baseUrl = "/api/responsible";

//== READ ==
router.get(`${baseUrl}/findByBusinessID/:id`, ResponsibleValidator.byID(), ResponsibleController.findByBusinessID);
router.get(`${baseUrl}/findByBusinessCNPJ/:cnpj`, ResponsibleValidator.byCNPJ(), ResponsibleController.findByBusinessCNPJ);

//== UPDATE ==
router.put(`${baseUrl}/updateByID/:id`, ResponsibleValidator.byID(), ResponsibleValidator.update(), ResponsibleController.updateByID);
//router.put(`${baseUrl}/updateByCNPJ/:cnpj`, BusinessValidator.byCNPJ(), BusinessValidator.update(), BusinessController.updateByCNPJ);

//== DELETE ==
//router.delete(`${baseUrl}/deleteByID/:id`, BusinessValidator.byID(), BusinessController.deleteByID);

export default router;