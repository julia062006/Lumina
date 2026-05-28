import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { editarAutor } from "../../../services/api";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Input from "../../../componentes/Input";
import Formulario from "../../../componentes/Formulario";
import { validacoesNome, validacoesTexto, MENSAGENS } from "../../../utilitarios/validacoes";
import { alertaSucesso, alertaErro } from "../../../utilitarios/formulario";

function EditarAutor() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    const autor = state?.autor;
    const [foto, setFoto] = useState(null);

    useEffect(() => {
        if (!autor) {
            navigate("/painel/autores");
            return;
        }
        setValue("nome", autor.nome);
        setValue("biografia", autor.biografia);
    }, [autor]);

    async function salvar(dados) {
        try {
            const formData = new FormData();
            formData.append("nome", dados.nome);
            formData.append("biografia", dados.biografia);
            if (foto) formData.append("foto", foto);

            const resposta = await editarAutor(autor.id_autor, formData);

            if (!resposta.ok) {
                await alertaErro(resposta.data.mensagem);
                return;
            }

            await alertaSucesso("Autor atualizado com sucesso!");
            navigate("/painel/autores");

        } catch (erro) {
            console.error(MENSAGENS.ERRO_SERVIDOR, erro);
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    if (!autor) return null;

    return (
        <div className="bg-green-50">
            <Formulario titulo="Editar Autor" onSubmit={handleSubmit(salvar)}>

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

                    {(foto || autor.foto) && (
                        <img
                            src={foto ? URL.createObjectURL(foto) : `http://localhost:3000/uploads/${autor.foto}`}
                            alt="preview"
                            width="150"
                            className="mt-2 mb-2 block"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFoto(e.target.files[0])}
                        className="block mt-2"
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <BotaoPrimario type="submit">Salvar</BotaoPrimario>
                    <BotaoSecundario type="button" onClick={() => navigate("/painel/autores")}>
                        Voltar
                    </BotaoSecundario>
                </div>

            </Formulario>
        </div>
    );
}

export default EditarAutor;