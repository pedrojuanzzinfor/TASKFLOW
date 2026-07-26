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
app.get('/renderTabelas', async (req, res) => {
    let query= ''
    let tarefas=false
    if(req.query.render=="tarefas"){
        query = `SELECT categorias.nome AS nome_categoria, categorias.id AS id_categoria, usuarios.id AS id_usuario,* FROM categorias INNER JOIN tarefas ON categorias.id = tarefas.categoria_id INNER JOIN usuarios ON tarefas.usuario_id = usuarios.id`
        tarefas = true
    }
    else if(req.query.render=="funcionarios"){
        query =`SELECT * FROM usuarios`
    }
    else{
        query = `SELECT * FROM categorias`
    }
    const tabela = await db.unsafe(query)
    const usuarios = await db`SELECT * FROM usuarios`
    const categorias = await db`SELECT * FROM categorias`
    res.render("renderTarefas", { tabela, usuarios, categorias, tarefas })
})
app.get('/editarTarefas', async (req, res) => {
    const tarefas: Tarefa[] = await db`SELECT * FROM tarefas WHERE status='pendente'`

    res.render("editarTarefas", { tarefas })
})
app.post('/updateTarefas', async (req, res) => {
    await db`UPDATE tarefas SET status='concluido' WHERE id=${req.body.linha}`
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
    const usuarios = await db`SELECT * FROM usuarios`
    const categorias = await db`SELECT * FROM categorias`
    res.render('adicionarTarefas', { usuarios, categorias })
})
app.post("/insertTarefa", async (req, res) => {
    await db`INSERT INTO tarefas(titulo, descricao, usuario_id, categoria_id, status) VALUES(${req.body.titulo},${req.body.descricao}, ${req.body.usuario},${req.body.categoria},   'pendente')`
    res.render("index")
})
app.get("/filterTarefas", async (req, res) => {
    const usuarios = await db`SELECT * FROM usuarios`
    const categorias = await db`SELECT * FROM categorias`
    const queryBase = `SELECT categorias.nome AS nome_categoria, categorias.id AS id_categoria, usuarios.id AS id_usuario,* FROM categorias INNER JOIN tarefas ON categorias.id = tarefas.categoria_id INNER JOIN usuarios ON tarefas.usuario_id = usuarios.id `
    
    
    
    const filtros: string[] = []
    let queryCompleta = ""
    if (req.query.usuario?.length) {
        filtros.push(` usuario_id='${req.query.usuario}'`)
    } if (req.query.status?.length) {
        filtros.push(` status='${req.query.status}'`)
    }
    if (req.query.categoria?.length) {
        filtros.push(` categoria_id='${req.query.categoria}'`)
    }
    // filtros nao tem nada dentro -> so a query queryBase
    // filtros tem 1 so de comprimento -> querybase + 'WHERE' + filtros[0]
    if(filtros.length==1){
        queryCompleta = queryBase + 'WHERE' + filtros[0]
    }
    else if(filtros.length>1){
        queryCompleta=queryBase + 'WHERE' + filtros.join('AND')
    }
    console.log(queryCompleta)
    const tarefasFiltradas = await db.unsafe(queryCompleta)
    // filtros tem mais de 1 de comprimento querybase + 'WHERE' + filtros.join('AND')
    res.render("renderTarefas", { tarefas: tarefasFiltradas, usuarios, categorias })
})
app.get("/insert", async (req,res)=>{
    res.render("adicionar", {tabela:req.query.tabela})
})
app.post("/insert", async (req, res)=>{
    const query = `INSERT INTO ${req.body.tabela}(nome) VALUES('${req.body.nome}')`
    await db.unsafe(query)
    res.redirect('/')
})