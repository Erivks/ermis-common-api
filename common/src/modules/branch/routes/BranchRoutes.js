import { Router } from 'express';
import BranchController from '../controller/BranchController.js';
import BranchValidator from '../validator/BranchValidator.js';

const router = new Router();
const baseUrl = "/api/branch";

//== CREATE ==
router.post(`${baseUrl}/create`, BranchValidator.create(), BranchController.create.bind(BranchController));

//== READ ==
router.get(`${baseUrl}/findAllByBusinessID/:id`,  BranchValidator.byID(), BranchController.findAllByBusinessID);
router.get(`${baseUrl}/findByID/:id`,  BranchValidator.byID(), BranchController.findByID.bind(BranchController));

//== UPDATE ==
router.put(`${baseUrl}/updateByID/:id`, BranchValidator.byID(), BranchValidator.updateBusiness(), BranchController.updateByID.bind(BranchController));
router.put(`${baseUrl}/updateByCNPJ/:cnpj`, BranchValidator.byCNPJ(), BranchValidator.updateBusiness(), BranchController.updateByCNPJ.bind(BranchController));

//== DELETE ==
router.delete(`${baseUrl}/deleteByID/:id`, BranchValidator.byID(), BranchController.deleteByID.bind(BranchController));

export default router;