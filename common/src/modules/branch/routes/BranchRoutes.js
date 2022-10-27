import { Router } from 'express';
import BranchContoller from '../controller/BranchController.js';
import BranchValidator from '../validator/BranchValidator.js';

const router = new Router();
const baseUrl = "/api/branch";

//== CREATE ==
router.post(`${baseUrl}/create`, BranchValidator.create(), BranchContoller.create.bind(BranchContoller));

//== READ ==
//router.get(`${baseUrl}/findAllByBusinessID/:id`,  BranchContoller.findAllByBusinessID);

//== UPDATE ==
//router.put(`${baseUrl}/updateByID/:id`, BusinessValidator.byID(), BusinessValidator.update(), BusinessController.updateByID.bind(BusinessController));
//router.put(`${baseUrl}/updateByCNPJ/:cnpj`, BusinessValidator.byCNPJ(), BusinessValidator.update(), BusinessController.updateByCNPJ.bind(BusinessController));

//== DELETE ==
//router.delete(`${baseUrl}/deleteByID/:id`, BusinessValidator.byID(), BusinessController.deleteByID.bind(BusinessController));
export default router;