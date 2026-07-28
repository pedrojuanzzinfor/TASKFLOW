import type { Request, Response } from "express";
import { TarefaService } from "../services/tarefas";
import { TarefaRepositorio } from "../repositorios/tarefas";
import type { TarefaTipo } from "../tipos/tarefas";
import type { TarefaFiltros } from "../tipos/filtro";

const repostorio = new TarefaRepositorio();
//lembrar de onde tiver res.render enviar tabela usuario e funcionario
const service = new TarefaService(repostorio);
export class TarefasController {
    async buscarTodos(_req: Request, res: Response) {
        try {
            const tarefas = await service.buscarTodos();
            res.render("tarefas/render", { tarefas });
        } catch (erro: any) {
            res.render("erros", { erro: erro.message });
        }
    }

    async buscarTodosCompleto(_req: Request, res: Response) {
        try {
            const tarefas = await service.buscarTodosCompleto();
            res.render("tarefas/render", { tarefas });
        } catch (erro: any) {
            res.render("erros", { erro: erro.message });
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const tarefas = await service.buscarPorId(Number(req.params.id));
            console.log(tarefas);
            res.render("tarefas/render", { tarefas });
        } catch (erro: any) {
            res.render("erros", { erro: erro.message });
        }
    }

    async renderFormAtualizarTarefas(req: Request, res: Response) {
        const id = Number(req.params.id);

        const tarefa = await service.buscarPorId(id);
        //parei o atualizar tarefas por nao ter get pra usuarios e categorias, quando tiver é pra voltar aqui
        res.render("tarefas/atualizarTarefas", { tarefa: tarefa[0] });
    }

    async atualizarTarefa(req: Request, res: Response) {
        try {
            const tarefa: TarefaTipo = {
                id: req.body.id,
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                status: req.body.status,
                criado_em: req.body.criado_em,
                usuario_id: req.body.usuario_id,
                categoria_id: req.body.categoria_id,
            };
            await service.atualizarTarefa(tarefa);
            res.redirect("/tarefas");
        } catch (erro: any) {
            res.render("erros", { erro: erro.message });
        }
    }
    async excluirTarefa(req: Request, res: Response) {
        try {
            await service.excluirTarefa(Number(req.params.id))
            res.redirect("/tarefas");
        } catch (erro: any) {
            res.render("erros", { erro: erro.message });
        }
    }
    async renderFormInserirTarefa(_req: Request, res:Response){
        //lembrar de quando tiver tabela usuario e categorias fornecer aqui pro render
        res.render("tarefas/inserirTarefas")
    }
    async adicionarTarefa(req: Request, res: Response) {
        try {
            const tarefa: Omit<TarefaTipo, "id"> = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                status: req.body.status,
                criado_em: req.body.criado_em,
                usuario_id: req.body.usuario_id,
                categoria_id: req.body.categoria_id
            }
            await service.inserirTarefa(tarefa);
            res.redirect("tarefas/");
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message });
        }

    }
    async filterTarefas(req:Request, res:Response){
        try{
            const filtros : TarefaFiltros={
                usuario_id:req.query.usuario_id ? Number(req.query.usuario_id): undefined,
                categoria_id:req.query.categoria_id ? Number(req.query.categoria_id) :undefined,
                status :req.query.status as 'pendente'|'concluido'
    
            }
            const tarefasFiltradas = await service.filterTarefas(filtros)
            res.render("render.ejs", {tarefas:tarefasFiltradas})
        }
        catch(error:any){
            res.render("erros", {mensagem:error.message})
        }
    }
}
