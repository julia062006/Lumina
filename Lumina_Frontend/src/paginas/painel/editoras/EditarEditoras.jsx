import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { editarEditora } from "../../../services/api";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Input from "../../../componentes/Input";
import Formulario from "../../../componentes/Formulario";
import { validacoesNome, validacoesTexto, MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaSucesso, alertaErro } from "../../../utilitarios/formulario";

function EditarEditoras() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    const editora = state?.editora;

    useEffect(() => {
        if (!editora) {
            navigate("/painel/editoras");
            return;
        }
        setValue("nome", editora.nome);
        setValue("descricao", editora.descricao);
    }, [editora]);

    async function salvar(dados) {
        try {
            const resposta = await editarEditora(editora.id_editora, {
                nome: dados.nome,
                descricao: dados.descricao,
            });

            if (!resposta.ok) {
                await alertaErro(resposta.data.mensagem);
                return;
            }

            await alertaSucesso("Editora atualizada com sucesso!");
            navigate("/painel/editoras");

        } catch (erro) {
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    if (!editora) return null;

    return (
        <div className="bg-purple-50">
            <Formulario titulo="Editar Editora" onSubmit={handleSubmit(salvar)}>

                <Input
                    label="Nome"
                    name="nome"
                    placeholder="Digite o nome da editora"
                    register={(name) => register(name, validacoesNome)}
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
                    <BotaoPrimario type="submit">Salvar</BotaoPrimario>
                    <BotaoSecundario type="button" onClick={() => navigate("/painel/editoras")}>
                        Voltar
                    </BotaoSecundario>
                </div>

            </Formulario>
        </div>
    );
}

export default EditarEditoras;