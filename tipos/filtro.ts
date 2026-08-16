export type TarefaFiltros = {
    usuario_id: number | null;
    categoria_id: number | null;
    status?: "pendente" | "concluido" | null;
};