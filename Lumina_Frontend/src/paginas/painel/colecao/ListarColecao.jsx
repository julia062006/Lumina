import { useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Tabela from "../../../componentes/Tabela";
import Paginacao from "../../../componentes/Paginacao";
import { MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaConfirmacao, alertaSucesso, alertaErro } from "../../../utilitarios/formulario";
import { useColecao } from "./useColecao";

function ListarColecao() {
    const navigate = useNavigate();
    const { colecoesPaginadas, totalPaginas, paginaAtual, setPaginaAtual, excluirColecao } = useColecao();

    async function excluir(id) {
        const resultado = await alertaConfirmacao();
        if (!resultado.isConfirmed) return;

        try {
            await excluirColecao(id);
            await alertaSucesso("Coleção removida com sucesso!");
        } catch (erro) {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    return (
        <div className="bg-purple-50 pt-10 pb-16">
            <div className="max-w-4xl mx-auto mt-10 px-4 pb-16 bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">COLEÇÕES</h1>

                    <div className="flex gap-2">
                        <BotaoPrimario onClick={() => navigate("/painel/cadastroColecao")}>
                            Cadastrar
                        </BotaoPrimario>

                        <BotaoSecundario type="button" onClick={() => navigate("/painel")}>
                            Voltar
                        </BotaoSecundario>
                    </div>
                </div>

                <Tabela
                    colunas={["Nome", "Descrição"]}
                    dados={colecoesPaginadas}

                    renderLinha={(colecao) => (
                        <>
                            <td className="px-4 py-2">{colecao.nome}</td>
                            <td className="px-4 py-2">{colecao.descricao}</td>
                        </>
                    )}

                    renderAcoes={(colecao) => (
                        <>
                            <BotaoSecundario onClick={() => navigate(`/painel/editarColecao/${colecao.id_colecao}`, { state: { colecao } })}>
                                Editar
                            </BotaoSecundario>

                            <button
                                onClick={() => excluir(colecao.id_colecao)}
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

export default ListarColecao;