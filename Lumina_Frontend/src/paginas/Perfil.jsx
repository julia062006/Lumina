import { LogOut, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import fundo from "../imagens/planofundo2.png";
import { excluirUsuario } from "../services/api";
import { alertaConfirmacao, alertaSucesso, alertaErro } from "../utilitarios/formulario";
import { MENSAGENS } from "../utilitarios/validacoes";

function Perfil() {

    const navigate = useNavigate();
    const { usuario, sair: sairContexto } = useUsuario();

    function sair() {
        sairContexto();
        navigate("/entrar");
    }

    async function excluir(id) {

        const resultado = await alertaConfirmacao();
        if (!resultado.isConfirmed) return;

        try {
            await excluirUsuario(id);
            await alertaSucesso("Conta excluída com sucesso!");
            sairContexto();
            navigate("/entrar");
        } catch (erro) {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    return (
        <div style={{ backgroundImage: `url(${fundo})` }} className="bg-cover bg-center py-24 pb-24">
            <div className="max-w-lg mx-auto p-6 border rounded-lg shadow bg-white">

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Perfil</h2>
                    <BotaoSecundario onClick={() => navigate("/editarPerfil")}>
                        <Pencil />
                        Editar perfil
                    </BotaoSecundario>
                </div>

                <div className="space-y-2">
                    <p><strong>Nome:</strong> {usuario.nome}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <div className="mt-6">
                        <BotaoPrimario onClick={() => navigate("/painel")}>
                            Acessar painel
                        </BotaoPrimario>
                    </div>

                    <div className="mt-6">
                        <BotaoSecundario onClick={sair}>
                            <LogOut />
                            Sair da Conta
                        </BotaoSecundario>
                    </div>

                    <div className="mt-6">
                        <BotaoSecundario onClick={() => excluir(usuario.id)} className="!text-red-500 !border-red-500">
                            <Trash2 />
                            Excluir minha conta
                        </BotaoSecundario>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;