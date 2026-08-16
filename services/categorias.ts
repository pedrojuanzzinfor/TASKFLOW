import type { CategoriaRepositorio } from "../repositorios/categorias";
import type { TipoUsuarioCategoria } from "../tipos/usuarioCategoria";

export class CategoriaService {
    repositorio: CategoriaRepositorio
    constructor(repositorio: CategoriaRepositorio) {
        this.repositorio = repositorio
    }
    async buscarTodos() {
        return this.repositorio.buscarTodos()
    }
    async pegarPeloId(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("o id precisa ser um número")
        }
        return this.repositorio.buscarPeloId(id)
    }
    async updateCategorias(categoria: TipoUsuarioCategoria) {
        await this.repositorio.updateCategoria(categoria)

    }
    async excluirCategorias(id: number) {
        if (Number.isNaN(id)) {
            throw new Error("o id precisa ser um número")
        }
        await this.repositorio.excluirCategoria(id)
    }
    async insertCategorias(categoria: Omit<TipoUsuarioCategoria, "id">) {
        await this.repositorio.insertCategoria(categoria)
    }

}