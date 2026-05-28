import { useEffect, useState } from "react";
import { getLivros, deletarLivro } from "../../../services/api";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

const ITENS_POR_PAGINA = 10;

export function useLivros() {
    const [livros, setLivros] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

    async function carregar() {
        try {
            const resposta = await getLivros();
            if (resposta.ok) {
                setLivros(resposta.data);
            } else {
                await alertaErro(MENSAGENS.ERRO_SERVIDOR);
            }
        } catch {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }
    useEffect(() => {
        carregar();
    }, []);

    const totalPaginas = Math.ceil(livros.length / ITENS_POR_PAGINA);

    const livrosPaginados = livros.slice(
        paginaAtual * ITENS_POR_PAGINA,
        (paginaAtual + 1) * ITENS_POR_PAGINA
    );


    async function excluirLivro(id) {
        await deletarLivro(id);
        await carregar();
    }


    return { livrosPaginados, totalPaginas, paginaAtual, setPaginaAtual, excluirLivro };
}