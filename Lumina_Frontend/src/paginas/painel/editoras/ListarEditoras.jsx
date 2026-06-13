import { useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Tabela from "../../../componentes/Tabela";
import Paginacao from "../../../componentes/Paginacao";
import { MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaConfirmacao, alertaSucesso, alertaErro } from "../../../utilitarios/formulario";
import { useEditoras } from "./useEditoras";

function ListarEditoras() {
    const navigate = useNavigate();
    const { editorasPaginadas, totalPaginas, paginaAtual, setPaginaAtual, excluirEditora } = useEditoras();

    async function excluir(id) {
        const resultado = await alertaConfirmacao();
        if (!resultado.isConfirmed) return;

        try {
            await excluirEditora(id);
            await alertaSucesso("Editora removida com sucesso!");
        } catch (erro) {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    return (
        <div className="bg-purple-50 pt-10 pb-16">
            <div className="max-w-4xl mx-auto mt-10 px-4 pb-16 bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">EDITORAS</h1>

                    <div className="flex gap-2">
                        <BotaoPrimario onClick={() => navigate("/painel/cadastroEditora")}>
                            Cadastrar
                        </BotaoPrimario>

                        <BotaoSecundario type="button" onClick={() => navigate("/painel")}>
                            Voltar
                        </BotaoSecundario>
                    </div>
                </div>

                <Tabela
                    colunas={["Nome", "Descrição"]}
                    dados={editorasPaginadas}

                    renderLinha={(editora) => (
                        <>
                            <td className="px-4 py-2">{editora.nome}</td>
                            <td className="px-4 py-2">{editora.descricao}</td>
                        </>
                    )}

                    renderAcoes={(editora) => (
                        <>
                            <BotaoSecundario onClick={() => navigate(`/painel/editarEditora/${editora.id_editora}`, { state: { editora } })}>
                                Editar
                            </BotaoSecundario>

                            <button
                                onClick={() => excluir(editora.id_editora)}
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

export default ListarEditoras;