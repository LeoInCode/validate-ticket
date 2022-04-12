import { Router } from 'express';
import FetlockController from '../src/01.api/fetlockController';

const fetlockRoutes = Router();

fetlockRoutes.get('/boleto/:code', FetlockController.getInformations);

export default fetlockRoutes;
