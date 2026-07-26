import type { Request, Response } from "express";
import { TarefaService } from "../services/tarefas";
import { TarefaRepositorio } from "../repositorios/tarefas";
const repostorio = new TarefaRepositorio()
const service = new TarefaService(repostorio)
export class TarefasController {
    async buscarTodos(req: Request, res: Response) {
        try {
            const tarefas = await service.buscarTodos()
            res.render("tarefas/render", { tarefas })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })

        }
    } async buscarTodosCompleto(req: Request, res: Response) {
        try {
            const tarefas = await service.buscarTodosCompleto()
            res.render("tarefas/render", { tarefas })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })

        }
    } async buscarPorId(req: Request, res: Response) {
        try {

            const tarefas = await service.buscarPorId(Number(req.params.id!))
            console.log(tarefas)
            res.render("tarefas/render", { tarefas })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })

        }
    }
}