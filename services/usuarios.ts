import type { UsuarioRepositorio } from "../repositorios/usuarios";
import type {  TipoCategoria } from "../tipos/categoria";
import type {UsuarioTipo} from "../tipos/usuario.ts";

export class UsuarioService {
    repositorio: UsuarioRepositorio
    constructor(repositorio: UsuarioRepositorio) {
        this.repositorio = repositorio
    }
    async buscarTodos() {
        return this.repositorio.pegarTodos()
    }
    async verificaLogin(login: string, senha: string):UsuarioTipo {
        const usuario = await this.repositorio.buscarPeloLogin(login)
            if (usuario.length===0){
              throw new Error("login não cadastrado no sistema")  
            } 
            const senhaUsuarioHash = usuario[0]?.senha
           const loginCorreto = await Bun.password.verify(senha,senhaUsuarioHash)
           if (!loginCorreto){
            throw new Error("senha incorreta")
           }
           return usuario[0]


    }
    async pegarPeloId(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("o id precisa ser um número")
        }
        return this.repositorio.pegarPeloId(id)
    }
    async updateUsuarios(usuario: TipoCategoria) {
        await this.repositorio.updateUsuarios(usuario)

    }
    async excluirUsuarios(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("o id precisa ser um número")
        }
        await this.repositorio.excluirUsuario(id)
    }
    async insertUsuarios(usuario: Omit<UsuarioTipo, "id">) {

        usuario.senha = await Bun.password.hash(usuario.senha, {algorithm:"bcrypt", cost:10})
        await this.repositorio.adicionarUsuario(usuario)
    }

}