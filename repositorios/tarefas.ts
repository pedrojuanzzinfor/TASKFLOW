import { db } from "../db";
import type { TarefaTipo } from "../tipos/tarefas";

type TarefaFiltros = {
    usuario_id?: number,
    categoria_id?: number,
    status?: 'pendente' | 'concluido'
}

export class TarefaRepositorio {
    async buscarTodos(): Promise<TarefaTipo[]> {
        return db`SELECT * FROM tarefas`
    }
    async buscarPorId(id: number): Promise<TarefaTipo[]> {
        return db`SELECT * FROM tarefas WHERE id = ${id}`
    }
    async buscarTodosCompleto(): Promise<TarefaTipo[]> {
        return db`SELECT categorias.nome AS nome_categoria, categorias.id AS id_categoria, usuarios.id AS id_usuario,* FROM categorias INNER JOIN tarefas ON categorias.id = tarefas.categoria_id INNER JOIN usuarios ON tarefas.usuario_id = usuarios.id`
    }
    async atualizarTarefa(tarefa: TarefaTipo): Promise<void> {
        await db.unsafe(`UPDATE tarefas SET titulo=${tarefa.titulo},descricao=${tarefa.descricao}, status= 'concluido', usuario_id=${tarefa.usuario_id}, categoria_id=${tarefa.categoria_id} WHERE id = ${tarefa.id}`)
    }
    async excluirTarefaPeloId(id: number): Promise<void> {
        await db`DELETE FROM tarefas WHERE id = ${id}`
    }
    async adicionarTarefa(id: number,
        titulo: string,
        descricao: string,
        status: string,
        usuario_id: number,
        categoria_id: number): Promise<void> {
        await db`INSERT INTO tarefas(titulo,descricao,status,usuario_id,categoria_id) VALUES(${titulo},${descricao},${status},${usuario_id},${categoria_id})`
    }
    async filtrarTarefas(filtros: TarefaFiltros): Promise<TarefaTipo[]> {
        const queryBase = `SELECT categorias.nome AS nome_categoria, categorias.id AS id_categoria, usuarios.id AS id_usuario,* FROM categorias INNER JOIN tarefas ON categorias.id = tarefas.categoria_id INNER JOIN usuarios ON tarefas.usuario_id = usuarios.id `



        const arrayFiltros: string[] = []
        let queryCompleta = ""
        if (filtros.usuario_id) {
            arrayFiltros.push(` usuario_id='${filtros.usuario_id}'`)
        } if (filtros.categoria_id) {
            arrayFiltros.push(` status='${filtros.categoria_id}'`)
        }
        if (filtros.status) {
            arrayFiltros.push(` categoria_id='${filtros.status}'`)
        }
        if (arrayFiltros.length == 1) {
            queryCompleta = queryBase + 'WHERE' + arrayFiltros[0]
        }
        else if (arrayFiltros.length > 1) {
            queryCompleta = queryBase + 'WHERE' + arrayFiltros.join('AND')
        }
        return await db.unsafe(queryCompleta)
    }
}