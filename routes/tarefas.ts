import { TarefasController } from "../controller/tarefa";
const controller = new TarefasController();

export function criarRotasTarefas(app: any, express: any) {
	app.use(express.urlencoded({ extended: true }));
	app.get("/tarefas", controller.buscarTodos);
	// app.get("/tarefas-completo", controller.buscarTodosCompleto);
	app.get("/tarefas/buscarPorId/:id", controller.buscarPorId);
	app.get("/tarefas/atualizar/:id", controller.renderFormAtualizarTarefas);
	app.post("/tarefas/atualizar", controller.atualizarTarefa);
	app.get("/tarefas/excluir/:id", controller.excluirTarefa)
	app.get("/tarefas/formInserir", controller.renderFormInserirTarefa);
	app.post("/tarefas/inserir", controller.adicionarTarefa);
	app.get("/tarefas/filtrar", controller.filterTarefas);
}
