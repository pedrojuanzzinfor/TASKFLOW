import { LoginController } from "../controller/login";

const controller = new LoginController()

export function criarRotasLogin(app:any, express:any){
    app.use(express.urlencoded({ extended: true }));
    app.get("/", controller.renderLogin)
    app.post("/login", controller.verificaLogin)

}
