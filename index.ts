import express from "express";
import { db } from "./db";
import "./routes/tarefas";

import { criarRotasTarefas } from "./routes/tarefas";
import { criarRotasUsuarios } from "./routes/usuarios";
import { criarRotasCategorias } from "./routes/categorias";

export const app = express();
criarRotasTarefas(app, express);
criarRotasUsuarios(app, express);
criarRotasCategorias(app, express);
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.listen(3000, () => {
	console.log("está rodando em http://localhost:3000");
});
app.get("/renderTabelas", async (req, res) => {
	let query = "";
	let tarefas = false;
	if (req.query.render == "tarefas") {
		query = `SELECT categorias.nome AS nome_categoria, categorias.id AS id_categoria, usuarios.id AS id_usuario,* FROM categorias INNER JOIN tarefas ON categorias.id = tarefas.categoria_id INNER JOIN usuarios ON tarefas.usuario_id = usuarios.id`;
		tarefas = true;
	} else if (req.query.render == "funcionarios") {
		query = `SELECT * FROM usuarios`;
	} else {
		query = `SELECT * FROM categorias`;
	}
	const tabela = await db.unsafe(query);
	const usuarios = await db`SELECT * FROM usuarios`;
	const categorias = await db`SELECT * FROM categorias`;
	res.render("renderTarefas", { tabela, usuarios, categorias, tarefas });
});
app.get("/editar", async (req, res) => {
	const nomeTabela = req.query.tabela;
	let query = `SELECT * FROM ${nomeTabela} `;

	if (nomeTabela == "tarefas") {
		query += "WHERE status = 'pendente'";
	}
	const tabela = await db.unsafe(query);
	console.log(tabela);
	res.render("editarTarefas", { tabela, nomeTabela });
});
app.post("/update", async (req, res) => {
	const query = `UPDATE ${req.body.tabela} SET `;
	let complemento = `nome = '${req.body.nome}' `;
	const complementoFinal = `WHERE id=${req.body.id}`;
	if (req.body.tabela == "tarefas") {
		complemento = `status = 'concluido' `;
	}
	const queryCompleta = query + complemento + complementoFinal;
	console.log(queryCompleta);
	await db.unsafe(queryCompleta);
	res.redirect("index");
});
app.get("/excluir", async (req, res) => {
	const query = `SELECT * FROM ${req.query.tabela}`;

	const tabela = await db.unsafe(query);

	res.render("excluirTarefas", { tabela, nomeTabela: req.query.tabela });
});
app.post("/delete", async (req, res) => {
	let mensagem = "";
	try {
		const query = `DELETE FROM ${req.body.tabela} WHERE id=${req.body.linha}`;
		await db.unsafe(query);
		res.redirect("index");
	} catch (error) {
		if (
			error ==
			`PostgresError: atualização ou exclusão em tabela "usuarios" viola restrição de chave estrangeira "fk_tarefas_usuarios" em "tarefas"
    at wrapPostgresError (internal:sql/postgres:171:27)
    at onRejectPostgresQuery (internal:sql/postgres:199:33)`
		) {
			mensagem =
				"impossivel apagar usuario:primero apague as tarefas vinculadas a ele";
		}
		if (
			error ==
			`PostgresError: atualização ou exclusão em tabela "categorias" viola restrição de chave estrangeira "fk_tarefas_categorias" em "tarefas"`
		) {
			mensagem =
				"impossivel apagar categoria:primero apague as tarefas vinculadas a ela";
		}

		res.render("telaERRO", { mensagem });
	}
});
app.get("/adicionarTarefas", async (req, res) => {
	const usuarios = await db`SELECT * FROM usuarios`;
	const categorias = await db`SELECT * FROM categorias`;
	res.render("adicionarTarefas", { usuarios, categorias });
});
app.post("/insertTarefa", async (req, res) => {
	await db`INSERT INTO tarefas(titulo, descricao, usuario_id, categoria_id, status) VALUES(${req.body.titulo},${req.body.descricao}, ${req.body.usuario},${req.body.categoria},   'pendente')`;
	res.redirect("index");
});
app.get("/filterTarefas", async (req, res) => {
	const usuarios = await db`SELECT * FROM usuarios`;
	const categorias = await db`SELECT * FROM categorias`;
	const queryBase = `SELECT categorias.nome AS nome_categoria, categorias.id AS id_categoria, usuarios.id AS id_usuario,* FROM categorias INNER JOIN tarefas ON categorias.id = tarefas.categoria_id INNER JOIN usuarios ON tarefas.usuario_id = usuarios.id `;

	const filtros: string[] = [];
	let queryCompleta = "";
	if (req.query.usuario?.length) {
		filtros.push(` usuario_id='${req.query.usuario}'`);
	}
	if (req.query.status?.length) {
		filtros.push(` status='${req.query.status}'`);
	}
	if (req.query.categoria?.length) {
		filtros.push(` categoria_id='${req.query.categoria}'`);
	}
	// filtros nao tem nada dentro -> so a query queryBase
	// filtros tem 1 so de comprimento -> querybase + 'WHERE' + filtros[0]
	if (filtros.length == 1) {
		queryCompleta = queryBase + "WHERE" + filtros[0];
	} else if (filtros.length > 1) {
		queryCompleta = queryBase + "WHERE" + filtros.join("AND");
	}
	console.log(queryCompleta);
	const tarefasFiltradas = await db.unsafe(queryCompleta);
	// filtros tem mais de 1 de comprimento querybase + 'WHERE' + filtros.join('AND')
	res.render("renderTarefas", {
		tabela: tarefasFiltradas,
		usuarios,
		categorias,
		tarefas: true,
	});
});
app.get("/insert", async (req, res) => {
	res.render("adicionar", { tabela: req.query.tabela });
});
app.post("/insert", async (req, res) => {
	const query = `INSERT INTO ${req.body.tabela}(nome) VALUES('${req.body.nome}')`;
	await db.unsafe(query);
	res.redirect("index");
});
app.get("/index", (req, res) => {
	res.render("index");
});
