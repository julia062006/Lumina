import { useEffect, useState } from "react";
import { getAutores, deletarAutores } from "../../../services/api";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

const ITENS_POR_PAGINA = 10;

export function useAutores() {
    const [autores, setAutores] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

    async function carregar() {
        try {
            const dados = await getAutores();
            setAutores(dados.data);
        } catch {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    useEffect(() => {
        carregar();
    }, []);

    const totalPaginas = Math.ceil(autores.length / ITENS_POR_PAGINA);

    const autoresPaginados = autores.slice(
        paginaAtual * ITENS_POR_PAGINA,
        (paginaAtual + 1) * ITENS_POR_PAGINA
    );

    async function excluirAutor(id) {
        await deletarAutores(id);
        await carregar();
    }


    return { autoresPaginados, totalPaginas, paginaAtual, setPaginaAtual, excluirAutor };
}


