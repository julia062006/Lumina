import { useEffect, useState } from "react";
import { getUsuarios } from "../../../services/api";
import { alertaErro } from "../../../utilitarios/formulario";
import { MENSAGENS } from "../../../utilitarios/validacoes";

const ITENS_POR_PAGINA = 10;

export function useUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(0);

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await getUsuarios();
                setUsuarios(dados.data);
            } catch {
                await alertaErro(MENSAGENS.ERRO_SERVIDOR);
            }
        }
        carregar();
    }, []);

    const totalPaginas = Math.ceil(usuarios.length / ITENS_POR_PAGINA);

    const usuariosPaginados = usuarios.slice(
        paginaAtual * ITENS_POR_PAGINA,
        (paginaAtual + 1) * ITENS_POR_PAGINA
    );

    return { usuariosPaginados, totalPaginas, paginaAtual, setPaginaAtual };
}