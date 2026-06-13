import { useEffect, useState } from "react";
import { getEditoras, deletarEditora } from "../../../services/api";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

const ITENS_POR_PAGINA = 10;

export function useEditoras() {
    const [editoras, setEditoras] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

    async function carregar() {
        try {
            const dados = await getEditoras();
            setEditoras(dados.data);
        } catch {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    useEffect(() => {
        carregar();
    }, []);

    const totalPaginas = Math.ceil(editoras.length / ITENS_POR_PAGINA);

    const editorasPaginadas = editoras.slice(
        paginaAtual * ITENS_POR_PAGINA,
        (paginaAtual + 1) * ITENS_POR_PAGINA
    );

    async function excluirEditora(id) {
        await deletarEditora(id);
        await carregar();
    }

    return { editorasPaginadas, totalPaginas, paginaAtual, setPaginaAtual, excluirEditora };
}