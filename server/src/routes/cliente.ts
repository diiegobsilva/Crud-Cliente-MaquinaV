import { Router } from "express";
import { ClienteController as ClienteController } from "../controllers";
const routes = Router();

routes.get('/historic', ClienteController.getHistoricCliente);
routes.get('/specific/:uuid', ClienteController.getCliente);

routes.post('/create', ClienteController.postCliente);

routes.put('/modify/:uuid', ClienteController.putCliente);

routes.delete('/delete/:uuid', ClienteController.deleteCliente);

export default routes;

