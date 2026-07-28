import { UsuarioController } from "../controller/usuario";

const controller = new UsuarioController()

export function criarRotasUsuarios(app:any, express:any){
	app.use(express.urlencoded({ extended: true }));
    app.get("/usuarios", controller.buscarTodos)
    app.get("/usuarios/buscar/:id", controller.pegarPeloId);
    app.get("/usuarios/editar/:id", controller.renderFormEditar)
    app.post("/usuarios/update", controller.updateUsuario)
    app.post("/usuarios/delete", controller.excluirUsuario)
    app.get("/usuarios/adicionar", controller.renderFormAdicionar)
    app.post("/usuarios/insert", controller.insertUsuario)
}