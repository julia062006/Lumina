import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { editarCategoria } from "../../../services/api";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Input from "../../../componentes/Input";
import Formulario from "../../../componentes/Formulario";
import { validacoesNome, validacoesTexto, validacoesSelect, MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaSucesso, alertaErro } from "../../../utilitarios/formulario";

function EditarCategoria() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    const categoria = state?.categoria;

    useEffect(() => {
        if (!categoria) {
            navigate("/painel/categorias");
            return;
        }
        setValue("nome", categoria.nome);
        setValue("descricao", categoria.descricao);
        setValue("destaque", String(categoria.destaque));
    }, [categoria]);

    async function salvar(dados) {
        try {
            const resposta = await editarCategoria(categoria.id_categoria, {
                nome: dados.nome,
                descricao: dados.descricao,
                destaque: dados.destaque
            });

            if (!resposta.ok) {
                await alertaErro(resposta.data.mensagem);
                return;
            }

            await alertaSucesso("Categoria atualizada com sucesso!");
            navigate("/painel/categorias");

        } catch (erro) {
            console.error(MENSAGENS.ERRO_SERVIDOR, erro);
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    if (!categoria) return null;

    return (
        <div className="bg-purple-50">
            <Formulario titulo="Editar Categoria" onSubmit={handleSubmit(salvar)}>

                <Input
                    label="Nome"
                    name="nome"
                    placeholder="Digite o nome da categoria"
                    register={(name) => register(name, validacoesNome)}
                    error={errors.nome}
                />

                <Input
                    label="Descrição"
                    name="descricao"
                    placeholder="Digite a descrição da categoria"
                    register={(name) => register(name, validacoesTexto("A descrição é obrigatória"))}
                    error={errors.descricao}
                />

                <div className="mt-4">
                    <label>Destaque</label>
                    <select
                        {...register("destaque", validacoesSelect("Destaque é obrigatório"))}
                        className="block w-full mt-2 border p-2"
                    >
                        <option value="">Selecione</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                    {errors.destaque && <p>{errors.destaque.message}</p>}
                </div>

                <div className="flex gap-4 mt-4">
                    <BotaoPrimario type="submit">Salvar</BotaoPrimario>
                    <BotaoSecundario type="button" onClick={() => navigate("/painel/categorias")}>
                        Voltar
                    </BotaoSecundario>
                </div>

            </Formulario>
        </div>
    );
}

export default EditarCategoria;