import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Cliente } from "../entities/Cliente";

class ClienteController {

    public async getHistoricCliente (req: Request, res: Response) : Promise<Response> {
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const allCliente = await clienteRepository.find()
        console.log(allCliente)
        return res.json(allCliente)
    }

    public async getCliente (req: Request, res: Response) : Promise<Response> {
        const idCliente:any = req.params.uuid
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const allCliente = await clienteRepository.findOneBy({id: idCliente})
        return res.json(allCliente)
    }

    public async postCliente (req: Request, res: Response) : Promise<Response> {
        const createCliente = req.body
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const insertCliente = new Cliente();
        insertCliente.nome = createCliente.nome
        insertCliente.email = createCliente.email
        insertCliente.cargo = createCliente.cargo
     
        const allCliente = await clienteRepository.save(insertCliente)
        return res.json(allCliente)
    }

    public async putCliente (req: Request, res: Response) : Promise<Response> {
        const createCliente = req.body
        const idCliente:any = req.params.uuid
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const findCliente = await clienteRepository.findOneBy({id: idCliente})
        findCliente.nome = createCliente.nome
        findCliente.email = createCliente.email
        findCliente.cargo = createCliente.cargo
        const allCliente = await clienteRepository.save(findCliente)
        return res.json(allCliente)
    }

    public async deleteCliente (req: Request, res: Response) : Promise<Response> {
        const idCliente:any = req.params.uuid
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const findCliente = await clienteRepository.findOneBy({id: idCliente})
        const allCliente = await clienteRepository.remove(findCliente)
        return res.json(allCliente)
    }

}
export default new ClienteController();