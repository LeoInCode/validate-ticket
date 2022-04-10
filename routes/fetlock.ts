import { Router } from 'express';

const fetlockRoutes = Router();

fetlockRoutes.get('/boleto', () => console.log('teste'));

export default fetlockRoutes;
