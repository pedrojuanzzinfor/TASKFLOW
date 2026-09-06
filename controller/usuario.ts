import type { Request, Response } from "express";
import { UsuarioRepositorio } from "../repositorios/usuarios";
import { UsuarioService } from "../services/usuarios";
import type { UsuarioTipo } from "../tipos/usuario";


const repositorio = new UsuarioRepositorio()
const service = new UsuarioService(repositorio)
export class UsuarioController {
    async buscarTodos(_req: Request, res: Response) {
        const usuarios = await service.buscarTodos()
        res.render("usuarios/render", { usuarios })
    }
    async pegarPeloId(_req: Request, res: Response) {
        try {
            const usuarios: TipoUsuarioCategoria[] = await service.pegarPeloId(Number(_req.params.id))
            res.render("usuarios/render", { usuarios })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })
        }
    }
    async renderFormEditar(_req: Request, res: Response) {
        try {
            const usuario = await service.pegarPeloId(Number(_req.params.id))
            console.log(usuario)
            res.render("usuarios/formEditar", { usuario: usuario[0] })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })
        }
    }
    async updateUsuario(_req: Request, res: Response) {
        try {
            const usuario: TipoUsuarioCategoria = {
                id: _req.body.id,
                nome: _req.body.nome
            }
            console.log(usuario)
            await service.updateUsuarios(usuario)
            const usuarios = await service.buscarTodos()
            res.render("usuarios/render", { usuarios })
        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })
        }
    }
    async excluirUsuario(_req: Request, res: Response) {
        console.log(_req.body.id)
        try {
            await service.excluirUsuarios(Number(_req.body.id))
            const usuarios = await service.buscarTodos()
            res.render("usuarios/render", { usuarios })

        }
        catch (erro: any) {
            res.render("erros", { erro: erro.message })

        }
    }
    async renderFormAdicionar(_req: Request, res: Response) {
        res.render("usuarios/formAdicionar");
    }
    async insertUsuario(_req: Request, res: Response) {
        try {
            const usuario: Omit<UsuarioTipo, 'id'> = {
                login: _req.body.nome,
                senha: _req.body.senha,
                adm: _req.body.adm
            }
            await service.insertUsuarios(usuario)
            const usuarios = await service.buscarTodos()
            res.redirect("/")
        } catch (erro: any) {
            res.render("erros", { erro: erro.message })

        }

    }
    
}