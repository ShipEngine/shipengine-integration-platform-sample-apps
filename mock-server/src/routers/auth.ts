import {Router} from 'express';
import {connect} from '../controllers/auth/auth';

export const authRouter = Router();

authRouter.post('/connect', connect)