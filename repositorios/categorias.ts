import { db } from "../db";
import type { TipoUsuarioCategoria } from "../tipos/categoria";

export class CategoriaRepositorio {
    async buscarTodos(): Promise<TipoUsuarioCategoria[]> {
        return db`SELECT * FROM categorias`
    }
    async buscarPeloId(id: number): Promise<TipoUsuarioCategoria[]> {
        return db`SELECT * FROM categorias WHERE id=${id}`
    }
    async updateCategoria(categoria: TipoUsuarioCategoria) {
        await db`UPDATE categorias SET nome = ${categoria.nome} WHERE id = ${categoria.id}`
    }
    async insertCategoria(categoria: Omit<TipoUsuarioCategoria, "id">) {
        await db`INSERT INTO categorias(nome) VALUES(${categoria.nome})`
    }
    async excluirCategoria(id: number): Promise<void> {
        await db`DELETE FROM categorias WHERE id=${id}`
    }
}