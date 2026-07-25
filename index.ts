import express from 'express';
import { db } from './db';

type Tarefa = {
    id: number,
    titulo: string,
    descricao: string,
    status: string,
    criado_em: string
}






const app = express()
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render("index")
})
app.listen(3000, () => {
    console.log('está rodando em http://localhost:3000')
})
app.get('/renderTarefas', async (req, res) => {
const tarefas: Tarefa[] = await db`SELECT * FROM tarefas`

    res.render("renderTarefas", { tarefas })
})
app.get('/editarTarefas', async (req, res) => {
const tarefas: Tarefa[] = await db`SELECT * FROM tarefas WHERE status='pendente'`

    res.render("editarTarefas", { tarefas })
})
app.post('/updateTarefas', async (req, res) => {
    await db`UPDATE tarefas SET status='concluída' WHERE id=${req.body.linha}`
    res.render("index")
})
app.get('/excluirTarefas', async (req, res) => {
const tarefas: Tarefa[] = await db`SELECT * FROM tarefas`

    res.render("excluirTarefas", { tarefas })

})
app.post('/deleteTarefa', async (req, res) => {
    await db`DELETE FROM tarefas WHERE id=${req.body.linha}`
    res.render("index")

})
app.get("/adicionarTarefas", async (req, res) => {
    res.render('adicionarTarefas')
})
app.post("/insertTarefa", async (req, res) => {
    await db`INSERT INTO tarefas(titulo, descricao, status) VALUES(${req.body.titulo},${req.body.descricao},   'pendente')`
    res.render("index")
})
