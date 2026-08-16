import type { UsuarioRepositorio } from "../repositorios/usuarios";
import type { TipoUsuarioCategoria } from "../tipos/usuarioCategoria";

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
    async updateUsuarios(usuario: TipoUsuarioCategoria) {
        await this.repositorio.updateUsuarios(usuario)

    }
    async excluirUsuarios(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("o id precisa ser um número")
        }
        await this.repositorio.excluirUsuario(id)
    }
    async insertUsuarios(usuario: Omit<TipoUsuarioCategoria, "id">) {
        await this.repositorio.adicionarUsuario(usuario)
    }

}