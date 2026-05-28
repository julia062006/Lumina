import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategorias } from "../services/api";

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarCategorias() {
            try {
                const resposta = await getCategorias();
                if (resposta.ok) {
                    setCategorias(resposta.data);
                } else {
                    setErro("Não foi possível carregar as categorias.");
                }
            } catch {
                setErro("Não foi possível carregar as categorias.");
            } finally {
                setLoading(false);
            }
        }
        carregarCategorias();
    }, []);

    function navegarParaCategoria(id) {
        navigate(`/biblioteca?categoria=${id}`);
    }

    function renderizarConteudo() {
        if (loading) return <p className="text-center">Carregando categorias...</p>;
        if (erro) return <p className="text-center text-red-500">{erro}</p>;
        if (categorias.length === 0) {
            return <p className="text-center text-muted-foreground">Nenhuma categoria encontrada.</p>;
        }

        return (
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria.id_categoria}
                            onClick={() => navegarParaCategoria(categoria.id_categoria)}
                            className="group w-full p-8 rounded-2xl bg-white border border-border/40 
                                transition-all duration-300 
                                hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-400/40 
                                hover:border-purple-300
                                flex flex-col items-center text-center"
                        >
                            <h3 className="text-lg font-semibold text-gray-800 
                                group-hover:text-[var(--lumina-purple)] transition-colors">
                                {categoria.nome}
                            </h3>

                            {categoria.descricao && (
                                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                                    {categoria.descricao}
                                </p>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f5f6ff]">
            <div className="py-10">
                <h1 className="text-4xl font-medium mb-2 text-center tracking-widest text-[#425B98]">
                    CATEGORIAS
                </h1>
                <p className="text-muted-foreground mb-10 text-center">
                    Explore nosso acervo por categoria.
                </p>
                {renderizarConteudo()}
            </div>
        </main>
    );
}

export default Categorias;