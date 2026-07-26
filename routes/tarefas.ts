
import { TarefasController } from "../controller/tarefa";
const controller = new TarefasController()

export function criarRotasTarefas(app: any) {
    app.get("/tarefas", controller.buscarTodos)
    app.get("/tarefas-completo", controller.buscarTodosCompleto)
    app.get("/tarefas/:id", controller.buscarPorId)

}