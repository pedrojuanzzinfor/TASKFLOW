export type TarefaFiltros = {
    usuario_id?: number;
    categoria_id?: number;
    status?: "pendente" | "concluido" | undefined;
};