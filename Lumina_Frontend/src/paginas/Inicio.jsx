import { Link, useNavigate } from "react-router-dom";
import { BotaoPrimario, BotaoSecundario } from "../componentes/Botao";
import bg from "../imagens/livros5.png";
import bh from "../imagens/planofundo2.png";
import React, { useEffect, useState } from "react";
import LivroCartao from "../componentes/LivroCartao";
import { getCategoriasDestaque, getLivrosDestaque } from "../services/api";
import { useUsuario } from "../contexto/UsuarioContexto";


function mapearLivroParaCard(livro) {
    return {
        title: livro.titulo,
        author: livro.autor?.nome,
        image: `http://localhost:3000/uploads/${livro.capa_imagem}`,
        description: livro.descricao ?? "",
        urlPdf: livro.arquivo_pdf ?? "",
    };
}

function Inicio() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [livrosDestaque, setLivrosDestaque] = useState([]);
    const [loadingLivros, setLoadingLivros] = useState(true);
    const [erroLivros, setErroLivros] = useState(null);
    const { token } = useUsuario();
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarCategorias() {
            try {
                const resposta = await getCategoriasDestaque();
                if (resposta.ok) {
                    setCategories(resposta.data);
                } else {
                    console.error(resposta.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        carregarCategorias();
    }, []);

    useEffect(() => {
        async function carregarLivros() {
            try {
                const resposta = await getLivrosDestaque();
                if (resposta.ok) {
                    setLivrosDestaque(resposta.data);
                } else {
                    setErroLivros("Não foi possível carregar os livros em destaque.");
                }
            } catch (error) {
                setErroLivros("Não foi possível carregar os livros em destaque.");
            } finally {
                setLoadingLivros(false);
            }
        }
        carregarLivros();
    }, []);

    return (
        <main>
            <div>
                <div
                    className="p-16 min-h-screen bg-no-repeat"
                    style={{
                        backgroundImage: `url(${bg}), url(${bh})`,
                        backgroundSize: "1000px, cover",
                        backgroundPosition: "right 35px, center",
                        backgroundRepeat: "no-repeat, no-repeat"
                    }}>

                    <section id="inicio" className="max-w-2xl pl-8 pb-16">
                        <h1 className="text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight">
                            Ilumine sua <br />
                            <span style={{ color: 'var(--lumina-purple)' }}>
                                Leitura
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-lg mt-6 leading-relaxed">
                            Mais do que uma plataforma, a Lumina é o seu portal para{' '}
                            <span className="text-foreground font-medium">conhecimento</span>,{' '}
                            <span className="text-foreground font-medium">imaginação</span> e{' '}
                            <span className="text-foreground font-medium">descoberta</span>.
                        </p>

                        <div className="flex gap-4 mt-6">
                            <BotaoPrimario onClick={() => navigate("/biblioteca")} className="px-8 py-3 text-base">
                                Explorar Livros
                            </BotaoPrimario>
                            {!token && (
                                <Link to="/cadastroUsuario">
                                    <BotaoSecundario className="!bg-white px-8 py-3 text-base">Criar Conta</BotaoSecundario>
                                </Link>
                            )}
                        </div>
                    </section>

                    <section id="categoria" className="pt-16 bg-muted/30 mt-10">
                        <div className="container mx-auto px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl lg:text-4xl font-medium mb-4 mt-10">
                                    Categorias em Destaque
                                </h2>
                            </div>
                            {loading ? (
                                <p className="text-center">Carregando...</p>
                            ) : (
                                <div className="max-w-6xl mx-auto px-6">
                                    <div className="flex flex-wrap justify-center gap-6">
                                        {Array.isArray(categories) && categories.map((category) => (
                                            <button
                                                key={category.id_categoria}
                                                onClick={() => navigate(`/biblioteca?categoria=${category.id_categoria}`)}
                                                className="group w-[220px] p-6 rounded-2xl bg-white border border-border/40 
                   transition-all duration-300 
                   hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-400/40 
                   hover:border-purple-300
                   flex flex-col items-center text-center"
                                            >
                                                <h3 className="font-medium text-gray-700 
                       group-hover:text-[var(--lumina-purple)] transition-colors">
                                                    {category.nome}
                                                </h3>

                                                {category.descricao && (
                                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                                        {category.descricao}
                                                    </p>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                <section id="Destaque" className="py-2 bg-muted/30 mt-10">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-medium mb-4">
                                Livros em Destaque
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {loadingLivros ? (
                                <p className="text-center col-span-4">Carregando...</p>
                            ) : erroLivros ? (
                                <p className="text-center col-span-4 text-red-500">{erroLivros}</p>
                            ) : (
                                livrosDestaque.map((livro) => (
                                    <LivroCartao key={livro.id_livro} livro={mapearLivroParaCard(livro)} />
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Inicio;