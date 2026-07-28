import type { UsuarioRepositorio } from "../repositorios/usuarios";
import type { TipoUsuario } from "../tipos/usuario";

export class UsuarioService {
    repositorio: UsuarioRepositorio
    constructor(repositorio: UsuarioRepositorio) {
        this.repositorio = repositorio
    }
    async buscarTodos() {
        return this.repositorio.pegarTodos()
    }
    async pegarPeloId(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("o id precisa ser um número")
        }
        return this.repositorio.pegarPeloId(id)
    }
    async updateUsuarios(usuario: TipoUsuario) {
        await this.repositorio.updateUsuarios(usuario)

    }
    async excluirUsuarios(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("o id precisa ser um número")
        }
        await this.repositorio.excluirUsuario(id)
    }
    async insertUsuarios(usuario:Omit<TipoUsuario,"id">){
        await this.repositorio.adicionarUsuario(usuario)
    }

}