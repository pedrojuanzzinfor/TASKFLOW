import { db } from "../db";
import type { TipoUsuarioCategoria } from "../tipos/usuarioCategoria";

export class UsuarioRepositorio {
    async pegarTodos(): Promise<TipoUsuarioCategoria[]> {
        return db`SELECT * FROM usuarios`

    }
    async pegarPeloId(id: number): Promise<TipoUsuarioCategoria[]> {
        return db`SELECT * FROM usuarios WHERE id = ${id}`
    }
    async updateUsuarios(usuario: TipoUsuarioCategoria): Promise<void> {
        await db`UPDATE usuarios SET nome=${usuario.nome} WHERE id=${usuario.id}`
    }
    async excluirUsuario(id: number): Promise<void> {
        await db`DELETE FROM usuarios WHERE id=${id}`
    }
    async adicionarUsuario(usuario: Omit<TipoUsuarioCategoria, "id">) {
        await db`INSERT INTO usuarios(nome) VALUES(${usuario.nome})`
    }


}
