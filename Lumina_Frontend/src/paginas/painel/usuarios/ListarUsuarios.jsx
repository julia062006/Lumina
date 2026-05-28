import { useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Tabela from "../../../componentes/Tabela";
import Paginacao from "../../../componentes/Paginacao";
import { useUsuarios } from "./useUsuarios";
import { formatarCPF } from "../../../utilitarios/formatadores";

function ListarUsuarios() {
    const navigate = useNavigate();
    const { usuariosPaginados, totalPaginas, paginaAtual, setPaginaAtual } = useUsuarios();

    return (
        <div className="bg-blue-50 pt-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 pb-16 bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">USUÁRIOS</h1>
                <div className="flex gap-2">
                
                    <BotaoSecundario type="button" className="" onClick={() => navigate("/painel")}>
                        Voltar
                    </BotaoSecundario>
                </div>
            </div>

            <Tabela
                colunas={["Nome", "Email", "CPF"]}
                dados={usuariosPaginados}
                renderLinha={(usuario) => (
                    <>
                        <td className="px-4 py-2">{usuario.nome}</td>
                        <td className="px-4 py-2">{usuario.email}</td>
                        <td className="px-4 py-2">{formatarCPF(usuario.cpf)}</td>
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

export default ListarUsuarios;