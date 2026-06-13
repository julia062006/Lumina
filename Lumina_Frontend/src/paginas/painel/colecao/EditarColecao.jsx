import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { editarColecao } from "../../../services/api";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Input from "../../../componentes/Input";
import Formulario from "../../../componentes/Formulario";
import { validacoesNome, validacoesTexto, MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaSucesso, alertaErro } from "../../../utilitarios/formulario";

function EditarColecao() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    const colecao = state?.colecao;

    useEffect(() => {
        if (!colecao) {
            navigate("/painel/colecao");
            return;
        }
        setValue("nome", colecao.nome);
        setValue("descricao", colecao.descricao);
    }, [colecao]);

    async function salvar(dados) {
        try {
            const resposta = await editarColecao(colecao.id_colecao, {
                nome: dados.nome,
                descricao: dados.descricao,
            });

            if (!resposta.ok) {
                await alertaErro(resposta.data.mensagem);
                return;
            }

            await alertaSucesso("Coleção atualizada com sucesso!");
            navigate("/painel/colecao");

        } catch (erro) {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    if (!colecao) return null;

    return (
        <div className="bg-purple-50">
            <Formulario titulo="Editar Coleção" onSubmit={handleSubmit(salvar)}>

                <Input
                    label="Nome"
                    name="nome"
                    placeholder="Digite o nome da coleção"
                    register={(name) => register(name, validacoesNome)}
                    error={errors.nome}
                />

                <Input
                    label="Descrição"
                    name="descricao"
                    placeholder="Digite a descrição da coleção"
                    register={(name) => register(name, validacoesTexto("A descrição é obrigatória"))}
                    error={errors.descricao}
                />

                <div className="flex gap-4 mt-4">
                    <BotaoPrimario type="submit">Salvar</BotaoPrimario>
                    <BotaoSecundario type="button" onClick={() => navigate("/painel/colecao")}>
                        Voltar
                    </BotaoSecundario>
                </div>

            </Formulario>
        </div>
    );
}

export default EditarColecao;