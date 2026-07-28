import type { TarefaRepositorio } from "../repositorios/tarefas";
import type { TarefaFiltros } from "../tipos/filtro";
import type { TarefaTipo } from "../tipos/tarefas";

export class TarefaService {
	private tarefaRepositorio: TarefaRepositorio;
	constructor(tarefaRepositorio: TarefaRepositorio) {
		this.tarefaRepositorio = tarefaRepositorio;
	}
	async buscarTodosCompleto() {
		return this.tarefaRepositorio.buscarTodosCompleto();
	}
	async buscarTodos() {
		return this.tarefaRepositorio.buscarTodos();
	}
	async buscarPorId(id: number) {
		if (Number.isNaN(id)) throw new Error("o id precisa ser um número");
		return this.tarefaRepositorio.buscarPorId(id);
	}
	async atualizarTarefa(tarefa: TarefaTipo) {
		this.tarefaRepositorio.atualizarTarefa(tarefa);
	}
	async excluirTarefa(id:number){
		if (Number.isNaN(id)) throw new Error("o id precisa ser um número");
		this.tarefaRepositorio.excluirTarefaPeloId(id)
	}
	async inserirTarefa(tarefa:Omit<TarefaTipo,"id">){
		//quando tiver tabela usuario e categoria verificar os id aqui
	 this.tarefaRepositorio.adicionarTarefa(tarefa)

	}
	async filterTarefas(filtros:TarefaFiltros){
		return this.tarefaRepositorio.filtrarTarefas(filtros)
	}
}
