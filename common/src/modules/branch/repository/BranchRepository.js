import BranchModel from "../model/BranchModel.js";
import Repository from '../../../../../core/classes/Repository.js';
import ApiException from '../../../../../core/exceptions/ApiException.js';
import logger from '../../../../../core/functions/logger.js';
import { HTTP_CODE, LOG_LEVEL } from "../../../../../core/constants/main.js";

class BranchRepository extends Repository {}

export default new BranchRepository(BranchModel);