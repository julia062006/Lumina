import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { criarAutor } from "../../../services/api";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Input from "../../../componentes/Input";
import Formulario from "../../../componentes/Formulario";
import { validacoesNome, validacoesTexto, MENSAGENS } from "../../../utilitarios/validacoes";
import { criarFormData, alertaSucesso, alertaErro } from "../../../utilitarios/formulario";

function CadastrarAutor() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [foto, setFoto] = useState(null);

    async function cadastrar(dados) {
        try {
            const formData = criarFormData({
                nome: dados.nome,
                biografia: dados.biografia,
                foto,
            });

            const resposta = await criarAutor(formData);

            if (!resposta.ok) {
                await alertaErro(resposta.data.mensagem);
                return;
            }

            await alertaSucesso(MENSAGENS.CADASTRO_SUCESSO("Autor"));
            reset();
            setFoto(null);

        } catch (erro) {
            console.error(MENSAGENS.ERRO_SERVIDOR, erro);
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    return (
        <div className="bg-green-50">
            <Formulario titulo="Cadastrar Autor" onSubmit={handleSubmit(cadastrar)}>

                <Input
                    label="Nome"
                    name="nome"
                    placeholder="Digite o nome do autor"
                    register={(name) => register(name, validacoesNome)}
                    error={errors.nome}
                />

                <Input
                    label="Biografia"
                    name="biografia"
                    placeholder="Digite a biografia do autor"
                    register={(name) => register(name, validacoesTexto("A biografia é obrigatória"))}
                    error={errors.biografia}
                />

                <div className="mt-4">
                    <label>Foto do Autor</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFoto(e.target.files[0])}
                        className="block mt-2"
                    />
                </div>

                {foto && (
                    <img
                        src={URL.createObjectURL(foto)}
                        alt="preview"
                        width="150"
                        className="mt-4"
                    />
                )}

                <div className="flex gap-4 mt-4">
                    <BotaoPrimario type="submit">Cadastrar</BotaoPrimario>
                    <BotaoSecundario type="button" onClick={() => navigate("/painel/autores")}>
                        Voltar
                    </BotaoSecundario>
                </div>

            </Formulario>
        </div>
    );
}

export default CadastrarAutor;