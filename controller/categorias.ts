import type { Request, Response } from "express";
import { CategoriaRepositorio } from "../repositorios/categorias";
import { CategoriaService } from "../services/categorias";
import type { TipoUsuarioCategoria } from "../tipos/usuarioCategoria";

const repositorio = new CategoriaRepositorio()
const service = new CategoriaService(repositorio)
export class CategoriaController {
    async buscarTodos(_req: Request, res: Response) {
        const categorias = await service.buscarTodos()
        console.log(categorias)
        res.render("categorias/render", { categorias })
    }
    async pegarPeloId(_req: Request, res: Response) {
        try {
            const categorias: TipoUsuarioCategoria[] = await service.pegarPeloId(Number(_req.params.id))
            res.render("categorias/render", { categorias })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })
        }
    }
    async renderFormEditar(_req: Request, res: Response) {
        try {
            const categoria = await service.pegarPeloId(Number(_req.params.id))
            console.log(categoria)
            res.render("categorias/formEditar", { categoria: categoria[0] })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })
        }
    }
    async updateCategoria(_req: Request, res: Response) {
        try {
            const categoria: TipoUsuarioCategoria = {
                id: _req.body.id,
                nome: _req.body.nome
            }
            console.log(categoria)
            await service.updateCategorias(categoria)
            const categorias = await service.buscarTodos()
            res.render("categorias/render", { categorias })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })
        }
    }
    async excluirCategoria(_req: Request, res: Response) {
        console.log(_req.body.id)
        try {
            await service.excluirCategorias(Number(_req.body.id))
            const categorias = await service.buscarTodos()
            res.render("categorias/render", { categorias })

        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })

        }
    }
    async renderFormAdicionar(_req: Request, res: Response) {
        res.render("categorias/formAdicionar");
    }
    async insertCategoria(_req: Request, res: Response) {
        try {
            const categoria: Omit<TipoUsuarioCategoria, 'id'> = {
                nome: _req.body.nome
            }
            await service.insertCategorias(categoria)
            const categorias = await service.buscarTodos()
            res.render("categorias/render", { categorias })
        } catch (erro: any) {
            res.render("erros", { erro: erro.message })

        }

    }
}