import { useEffect, useState } from "react";
import { getColecoes, deletarColecao } from "../../../services/api";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

const ITENS_POR_PAGINA = 10;

export function useColecao() {
    const [colecoes, setColecoes] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

    async function carregar() {
        try {
            const dados = await getColecoes();
            setColecoes(dados.data);
        } catch {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    useEffect(() => {
        carregar();
    }, []);

    const totalPaginas = Math.ceil(colecoes.length / ITENS_POR_PAGINA);

    const colecoesPaginadas = colecoes.slice(
        paginaAtual * ITENS_POR_PAGINA,
        (paginaAtual + 1) * ITENS_POR_PAGINA
    );

    async function excluirColecao(id) {
        await deletarColecao(id);
        await carregar();
    }

    return { colecoesPaginadas, totalPaginas, paginaAtual, setPaginaAtual, excluirColecao };
}