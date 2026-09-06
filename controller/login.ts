import type { Request, Response } from "express";
import { UsuarioRepositorio } from "../repositorios/usuarios";
import { UsuarioService } from "../services/usuarios";

const repositorio = new UsuarioRepositorio()
'4'
const service = new UsuarioService(repositorio)
export class LoginController{
    renderLogin(req:Request, res:Response){
        res.render("login.ejs")
    }
  async verificaLogin(req: Request, res: Response){
        try{
            const usuario = await service.verificaLogin(req.body.login, req.body.senha)
            res.render("telaInicial.ejs", {adm:usuario.adm, login:usuario.login, id:usuario.id})
        }
        catch(erro){
        res.render("login.ejs", {erro})
        }
    }
}