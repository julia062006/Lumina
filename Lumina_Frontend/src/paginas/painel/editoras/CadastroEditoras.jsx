import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { criarEditora } from "../../../services/api";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Input from "../../../componentes/Input";
import Formulario from "../../../componentes/Formulario";
import { validacoesTexto, MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaSucesso, alertaErro } from "../../../utilitarios/formulario";

function CadastroEditoras() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    async function cadastrar(dados) {
        try {
            const resposta = await criarEditora({
                nome: dados.nome,
                descricao: dados.descricao,
            });

            if (!resposta.ok) {
                await alertaErro(resposta.data.mensagem);
                return;
            }

            await alertaSucesso(MENSAGENS.CADASTRO_SUCESSO("Editora"));
            reset();

        } catch (erro) {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    return (
        <div className="bg-purple-50">
            <Formulario titulo="Cadastrar Editora" onSubmit={handleSubmit(cadastrar)}>

                <Input
                    label="Nome"
                    name="nome"
                    placeholder="Digite o nome da editora"
                    register={(name) => register(name, validacoesTexto("O nome é obrigatório"))}
                    error={errors.nome}
                />

                <Input
                    label="Descrição"
                    name="descricao"
                    placeholder="Digite a descrição da editora"
                    register={(name) => register(name, validacoesTexto("A descrição é obrigatória"))}
                    error={errors.descricao}
                />

                <div className="flex gap-4 mt-4">
                    <BotaoPrimario type="submit">Cadastrar</BotaoPrimario>
                    <BotaoSecundario type="button" onClick={() => navigate("/painel/editoras")}>
                        Voltar
                    </BotaoSecundario>
                </div>

            </Formulario>
        </div>
    );
}

export default CadastroEditoras;