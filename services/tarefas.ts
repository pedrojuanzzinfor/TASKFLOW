import type { TarefaRepositorio } from "../repositorios/tarefas";

export class TarefaService {
    private tarefaRepositorio: TarefaRepositorio;
    constructor(tarefaRepositorio: TarefaRepositorio) {
        this.tarefaRepositorio = tarefaRepositorio

    }
    async buscarTodosCompleto() {
         return this.tarefaRepositorio.buscarTodosCompleto()

    }
    async buscarTodos(){
        return this.tarefaRepositorio.buscarTodos()
    }
    async buscarPorId(id:number){
        if(Number.isNaN(id)) throw new Error("o id precisa ser um número")

        return this.tarefaRepositorio.buscarPorId(id)
    }
}