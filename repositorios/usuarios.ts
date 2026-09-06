import { db } from "../db";
import type { TipoCategoria } from "../tipos/categoria";
import type { UsuarioTipo } from "../tipos/usuario";

export class UsuarioRepositorio {
    async pegarTodos(): Promise<TipoCategoria[]> {
        return db`SELECT * FROM usuarios`

    }
    async buscarPeloLogin(login: string): Promise<TipoCategoria[]> {
        return db`SELECT * FROM usuarios WHERE login=${login}`
    }
    async pegarPeloId(id: number): Promise<TipoCategoria[]> {
        return db`SELECT * FROM usuarios WHERE id = ${id}`
    }
    async updateUsuarios(usuario: TipoCategoria): Promise<void> {
        await db`UPDATE usuarios SET nome=${usuario.nome} WHERE id=${usuario.id}`
    }
    async excluirUsuario(id: number): Promise<void> {
        await db`DELETE FROM usuarios WHERE id=${id}`
    }
    async adicionarUsuario(usuario: Omit<UsuarioTipo, "id">) {
        await db`INSERT INTO usuarios(login, senha, adm) VALUES(${usuario.login}, ${usuario.senha}, ${usuario.adm})`
    }


}
