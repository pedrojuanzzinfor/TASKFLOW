import type { Request, Response } from "express";
import { TarefaService } from "../services/tarefas";
import { TarefaRepositorio } from "../repositorios/tarefas";
import type { TarefaTipo } from "../tipos/tarefas";
import type { TarefaFiltros } from "../tipos/filtro";
import { UsuarioRepositorio } from "../repositorios/usuarios";
import type { TipoUsuarioCategoria } from "../tipos/usuarioCategoria";
import { CategoriaRepositorio } from "../repositorios/categorias";
import { UsuarioService } from "../services/usuarios";
import { CategoriaService } from "../services/categorias";

const repostorio = new TarefaRepositorio();
//lembrar de onde tiver res.render enviar tabela usuario e funcionario
const service = new TarefaService(repostorio);
export class TarefasController {

    async buscarTodos(_req: Request, res: Response) {

        try {
            const tarefas = await service.buscarTodos();
            const repUsuario = new UsuarioRepositorio()
            const serviceU = new UsuarioService(repUsuario)
            const usuarios = await serviceU.buscarTodos()
            const repCategoria = new CategoriaRepositorio()
            const serviceC = new CategoriaService(repCategoria)
            const categorias = await serviceC.buscarTodos()
            console.log(tarefas)
            res.render("tarefas/render", { tarefas, usuarios, categorias });
        } catch (erro: any) {
            console.log(erro)
            res.render("erros", { erro: erro.message });
        }
    }

    // async buscarTodosCompleto(_req: Request, res: Response) {
    //     try {
    //         const tarefas = await service.buscarTodosCompleto();

    //         res.render("tarefas/render", { tarefas, usuarios: this.usuarios, categorias: this.categorias });
    //     } catch (erro: any) {
    //         res.render("erros", { erro: erro.message });
    //     }
    // }

    async buscarPorId(req: Request, res: Response) {
        try {
            const tarefas = await service.buscarPorId(Number(req.params.id));
            console.log(tarefas);
            this.construirTabelasDependentes()

            res.render("tarefas/render", { tarefas, usuarios: this.usuarios, categorias: this.categorias });
        } catch (erro: any) {
            res.render("erros", { erro: erro.message });
        }
    }

    async renderFormAtualizarTarefas(req: Request, res: Response) {
        const id = Number(req.params.id);

        const tarefa = await service.buscarPorId(id);
        res.render("tarefas/atualizarTarefas", { tarefa: tarefa[0], usuarios: this.usuarios, categorias: this.categorias });
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
    async renderFormInserirTarefa(_req: Request, res: Response) {
        const repUsuario = new UsuarioRepositorio()
        const serviceU = new UsuarioService(repUsuario)
        const usuarios = await serviceU.buscarTodos()
        const repCategoria = new CategoriaRepositorio()
        const serviceC = new CategoriaService(repCategoria)
        const categorias = await serviceC.buscarTodos()
        console.log(usuarios)
        res.render("tarefas/inserirTarefas", { usuarios, categorias })
    }
    async adicionarTarefa(req: Request, res: Response) {
        try {
            console.log(req.body)
            const tarefa: Omit<TarefaTipo, "id"> = {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                status: req.body.status,
                criado_em: req.body.criado_em,
                usuario_id: req.body.usuario_id,
                categoria_id: req.body.categoria_id
            }
            await service.inserirTarefa(tarefa);
            res.redirect("/tarefas");
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message });
        }

    }
    async filterTarefas(req: Request, res: Response) {
        try {

            const filtros: TarefaFiltros = {
                usuario_id: req.query.usuario_id ? Number(req.query.usuario_id) : null,
                categoria_id: req.query.categoria_id ? Number(req.query.categoria_id) : null,
                status: req.query.status as 'pendente' | 'concluido'

            }

            const existeValor = Object.values(filtros).some((el) => !!el)

            if (!existeValor) throw new Error("Defina algum filtro")

            const tarefasFiltradas = await service.filterTarefas(filtros)
            const repUsuario = new UsuarioRepositorio()
            const serviceU = new UsuarioService(repUsuario)
            const usuarios = await serviceU.buscarTodos()
            const repCategoria = new CategoriaRepositorio()
            const serviceC = new CategoriaService(repCategoria)
            const categorias = await serviceC.buscarTodos()
            res.render("tarefas/render.ejs", { tarefas: tarefasFiltradas, usuarios, categorias })
        }
        catch (error: any) {
            console.log(error)
            res.render("erros", { erro: error.message })
        }
    }
}
