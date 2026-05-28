import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { editarLivro, getAutores, getCategorias } from "../../../services/api";
import { BotaoPrimario, BotaoSecundario } from "../../../componentes/Botao";
import Input from "../../../componentes/Input";
import Formulario from "../../../componentes/Formulario";
import { validacoesNome, validacoesTexto, MENSAGENS, validacoesSelect, validacoesNumero } from "../../../utilitarios/validacoes";
import { alertaSucesso, alertaErro } from "../../../utilitarios/formulario";

function EditarLivro() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();
    const livro = state?.livro;
    const [capaImagem, setCapaImagem] = useState(null);
    const [arquivoPdf, setArquivoPdf] = useState(null);
    const [autores, setAutores] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        if (!livro) {
            navigate("/painel/livros");
            return;
        }
        
        async function carregarSelects() {
            const [resAutores, resCategorias] = await Promise.all([
                getAutores(),
                getCategorias()
            ]);
            setAutores(resAutores.data);
            setCategorias(resCategorias.data);
            
            setValue("titulo", livro.titulo);
            setValue("descricao", livro.descricao);
            setValue("preco", Number(livro.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
            setValue("id_autor", livro.id_autor);
            setValue("id_categoria", livro.id_categoria);
            setValue("destaque", String(livro.destaque));
        }
        carregarSelects();
    }, [livro]);

    async function salvar(dados) {
        try {
            const formData = new FormData();
            formData.append("titulo", dados.titulo);
            formData.append("descricao", dados.descricao);
            formData.append("preco", dados.preco.replace(/[R$\s.]/g, "").replace(",", "."));
            formData.append("id_autor", dados.id_autor);
            formData.append("id_categoria", dados.id_categoria);
            formData.append("destaque", dados.destaque);
            if (capaImagem) formData.append("capa_imagem", capaImagem);
            if (arquivoPdf) formData.append("arquivo_pdf", arquivoPdf);

            const resposta = await editarLivro(livro.id_livro, formData);

            if (!resposta.ok) {
                await alertaErro(resposta.data.mensagem);
                return;
            }

            await alertaSucesso("Livro atualizado com sucesso!");
            navigate("/painel/livros");

        } catch (erro) {
            console.error(MENSAGENS.ERRO_SERVIDOR, erro);
            await alertaErro(MENSAGENS.ERRO_SERVIDOR);
        }
    }

    if (!livro) return null;

    return (
        <div className="bg-blue-50">
            <Formulario titulo="Editar Livro" onSubmit={handleSubmit(salvar)}>

                <Input
                    label="Título"
                    name="titulo"
                    placeholder="Digite o nome do livro"
                    register={(name) => register(name, validacoesNome)}
                    error={errors.titulo}
                />

                <Input
                    label="Descrição"
                    name="descricao"
                    placeholder="Digite a descrição do livro"
                    register={(name) => register(name, validacoesTexto("Descrição obrigatória"))}
                    error={errors.descricao}
                />

                <Input
                    label="Preço"
                    name="preco"
                    type="text"
                    placeholder="Digite o preço"
                    register={(name) => register(name, validacoesNumero("O preço é obrigatório"))}
                    error={errors.preco}
                />

                <div className="mt-4">
                    <label>Autor</label>
                    <select
                        {...register("id_autor", { required: "Autor obrigatório" })}
                        className="block mt-2 w-full border p-2 rounded"
                    >
                        {autores.map((a) => (
                            <option key={a.id_autor} value={a.id_autor}>{a.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="mt-4">
                    <label>Categoria</label>
                    <select
                        {...register("id_categoria", { required: "Categoria obrigatória" })}
                        className="block mt-2 w-full border p-2 rounded"
                    >
                        {categorias.map((c) => (
                            <option key={c.id_categoria} value={c.id_categoria}>{c.nome}</option>
                        ))}
                    </select>
                </div>

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

                <div className="mt-4">
                    <label>Capa do Livro</label>

                    {(capaImagem || livro.capa_imagem) && (
                        <img
                            src={capaImagem
                                ? URL.createObjectURL(capaImagem)
                                : `http://localhost:3000/uploads/${livro.capa_imagem}`}
                            alt="preview capa"
                            width="150"
                            className="mt-2 mb-2 block"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCapaImagem(e.target.files[0])}
                        className="block mt-2"
                    />
                </div>

                <div className="mt-4">
                    <label>Arquivo PDF</label>

                    {!arquivoPdf && livro.arquivo_pdf && (
                        <p className="text-sm text-gray-500 mt-1">
                            PDF atual: {livro.arquivo_pdf}
                        </p>
                    )}

                    {arquivoPdf && (
                        <p className="text-sm text-green-600 mt-1">
                            Novo PDF selecionado: {arquivoPdf.name}
                        </p>
                    )}

                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setArquivoPdf(e.target.files[0])}
                        className="block mt-2"
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <BotaoPrimario type="submit">Salvar</BotaoPrimario>
                    <BotaoSecundario type="button" onClick={() => navigate("/painel/livros")}>
                        Voltar
                    </BotaoSecundario>
                </div>

            </Formulario>
        </div>
    );
}

export default EditarLivro;