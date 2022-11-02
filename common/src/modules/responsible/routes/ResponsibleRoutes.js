import { Router } from 'express';
import ResponsibleController from '../controller/ResponsibleController.js';
import ResponsibleValidator from '../validator/ResponsibleValidator.js';

const router = new Router();
const baseUrl = "/api/responsible";

//== READ ==
router.get(`${baseUrl}/findByBusinessID/:id`, ResponsibleValidator.byID(), ResponsibleController.findByBusinessID);
router.get(`${baseUrl}/findByBusinessCNPJ/:cnpj`, ResponsibleValidator.byCNPJ(), ResponsibleController.findByBusinessCNPJ);
router.get(`${baseUrl}/findByCPF/:cpf`, ResponsibleValidator.byCPF(), ResponsibleController.findByCPF.bind(ResponsibleController));

//== UPDATE ==
router.put(`${baseUrl}/updateByID/:id`, ResponsibleValidator.byID(), ResponsibleValidator.update(), ResponsibleController.updateByID.bind(ResponsibleController));

export default router;