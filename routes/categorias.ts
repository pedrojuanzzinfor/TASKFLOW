import { CategoriaController } from "../controller/categorias";

const controller = new CategoriaController()

export function criarRotasCategorias(app:any, express:any){
    app.use(express.urlencoded({ extended: true }));
    app.get("/Categorias", controller.buscarTodos)
    app.get("/Categorias/buscar/:id", controller.pegarPeloId);
    app.get("/Categorias/editar/:id", controller.renderFormEditar)
    app.post("/Categorias/update", controller.updateCategoria)
    app.post("/Categorias/delete", controller.excluirCategoria)
    app.get("/Categorias/adicionar", controller.renderFormAdicionar)
    app.post("/Categorias/insert", controller.insertCategoria)
}
