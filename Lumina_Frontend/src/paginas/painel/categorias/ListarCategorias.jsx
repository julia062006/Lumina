import { useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Tabela from "../../../componentes/Tabela";
import Paginacao from "../../../componentes/Paginacao";
import { MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaConfirmacao, alertaSucesso, alertaErro } from "../../../utilitarios/formulario";
import { useCategorias } from "./useCategorias";

function ListarCategorias() {
    const navigate = useNavigate();
    const { categoriasPaginadas, totalPaginas, paginaAtual, setPaginaAtual, excluirCategoria } = useCategorias();

    async function excluir(id) {
        const resultado = await alertaConfirmacao();
        if (!resultado.isConfirmed) return;

        try {
            await excluirCategoria(id);
            await alertaSucesso("Categoria removida com sucesso!");
        } catch (erro) {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);

        }
    }

    return (
        <div className="bg-purple-50 pt-10 pb-16">
            <div className="max-w-4xl mx-auto mt-10 px-4 pb-16 bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">CATEGORIAS</h1>

                    <div className="flex gap-2">
                        <BotaoPrimario onClick={() => navigate("/painel/cadastroCategoria")}>
                            Cadastrar
                        </BotaoPrimario>

                        <BotaoSecundario type="button" onClick={() => navigate("/painel")}>
                            Voltar
                        </BotaoSecundario>
                    </div>
                </div>

                <Tabela
                    colunas={["Nome", "Descrição", "Destaque"]}
                    dados={categoriasPaginadas}

                    renderLinha={(categoria) => (
                        <>
                            <td className="px-4 py-2">{categoria.nome}</td>
                            <td className="px-4 py-2">{categoria.descricao}</td>
                            <td className="px-4 py-2">{categoria.destaque === true || categoria.destaque === "true" ? "Sim" : "Não"}</td>

                        </>
                    )}

                    renderAcoes={(categoria) => (
                        <>
                            <BotaoSecundario onClick={() => navigate(`/painel/editarCategoria/${categoria.id_categoria}`, { state: { categoria } })}>
                                Editar
                            </BotaoSecundario>

                            <button
                                onClick={() => excluir(categoria.id_categoria)}
                                className="text-red-500 hover:underline text-sm"
                            >
                                Excluir
                            </button>
                        </>
                    )}
                />

                <Paginacao
                    totalPaginas={totalPaginas}
                    paginaAtual={paginaAtual}
                    onMudarPagina={setPaginaAtual}
                />
            </div>
        </div>
    );
}

export default ListarCategorias;