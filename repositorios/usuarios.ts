import { db } from "../db";
import type { TipoUsuario } from "../tipos/usuario";

export class UsuarioRepositorio {
    async pegarTodos():      Promise<TipoUsuario[]> {
        return db`SELECT * FROM usuarios`

    }
    async pegarPeloId(id: number):Promise<TipoUsuario[]> {
        return db`SELECT * FROM usuarios WHERE id = ${id}`
    }
    async updateUsuarios(usuario:TipoUsuario): Promise<void>{
        await db`UPDATE usuarios SET nome=${usuario.nome} WHERE id=${usuario.id}`
    }
    async excluirUsuario(id:number): Promise<void>{
        await db`DELETE FROM usuarios WHERE id=${id}`
    }
    async adicionarUsuario(usuario:Omit<TipoUsuario, "id">){
        await db`INSERT INTO usuarios(nome) VALUES(${usuario.nome})`
    }
    

}
