import { Router } from 'express';
import { getSignedToken } from "../services/auth.js"
const routerA = Router();
routerA.get('', async (req, res) => {
    return res.json(getSignedToken());
});
export default routerA;