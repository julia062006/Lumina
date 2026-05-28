import { useEffect, useState } from "react";
import { getCategorias, deletarCategorias } from "../../../services/api";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

const ITENS_POR_PAGINA = 10;

export function useCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

    async function carregar() {
        try {
            const dados = await getCategorias();
            setCategorias(dados.data);
        } catch {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    useEffect(() => {
        carregar();
    }, []);

    const totalPaginas = Math.ceil(categorias.length / ITENS_POR_PAGINA);

    const categoriasPaginadas = categorias.slice(
        paginaAtual * ITENS_POR_PAGINA,
        (paginaAtual + 1) * ITENS_POR_PAGINA
    );

    async function excluirCategoria(id) {
        await deletarCategorias(id);
        await carregar();
    }


    return { categoriasPaginadas, totalPaginas, paginaAtual, setPaginaAtual, excluirCategoria };
}


