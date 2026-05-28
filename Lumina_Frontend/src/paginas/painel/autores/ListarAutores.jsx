import { useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Tabela from "../../../componentes/Tabela";
import Paginacao from "../../../componentes/Paginacao";
import { MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaConfirmacao, alertaSucesso, alertaErro } from "../../../utilitarios/formulario";
import { useAutores } from "./useAutores";

function ListarAutores() {
    const navigate = useNavigate();
    const { autoresPaginados, totalPaginas, paginaAtual, setPaginaAtual, excluirAutor } = useAutores();

    async function excluir(id) {
        const resultado = await alertaConfirmacao();
        if (!resultado.isConfirmed) return;

        try {
            await excluirAutor(id);
            await alertaSucesso("Autor removido com sucesso!");
        } catch (erro) {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    return (
        <div className="bg-green-50 pt-10 pb-16">
            <div className="max-w-4xl mx-auto mt-10 px-4 bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">AUTORES</h1>

                    <div className="flex gap-2">
                        <BotaoPrimario onClick={() => navigate("/painel/cadastroAutor")}>
                            Cadastrar
                        </BotaoPrimario>

                        <BotaoSecundario type="button" onClick={() => navigate("/painel")}>
                            Voltar
                        </BotaoSecundario>
                    </div>
                </div>

                <Tabela
                    colunas={["Foto", "Nome"]}
                    dados={autoresPaginados}

                    renderLinha={(autor) => (
                        <>
                            <td className="px-4 py-2">
                                <img
                                    src={`http://localhost:3000/uploads/${autor.foto}`}
                                    alt={autor.nome}
                                    className="w-16 h-20 object-cover rounded"
                                />
                            </td>

                            <td className="px-4 py-2">
                                {autor.nome}
                            </td>
                        </>
                    )}

                    renderAcoes={(autor) => (
                        <>
                            <BotaoSecundario onClick={() => { navigate(`/painel/editarAutor/${autor.id_autor}`, { state: { autor } }) }}>
                                Editar
                            </BotaoSecundario>

                            <button
                                onClick={() => excluir(autor.id_autor)}
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

export default ListarAutores;