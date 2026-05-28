import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LivroCartao from "../componentes/LivroCartao";

function mapearLivroParaCartao(livro) {
  return {
    title:       livro.titulo,
    author:      livro.autor?.nome,
    image:       `http://localhost:3000/uploads/${livro.capa_imagem}`,
    description: livro.descricao ?? "",
    urlPdf:      livro.arquivo_pdf ?? "",
  };
}

function Biblioteca() {
    const [searchParams] = useSearchParams();
    const categoriaId = searchParams.get("categoria");

    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let url = "http://localhost:3000/livros";

        if (categoriaId) {
            url += `?categoria=${categoriaId}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setLivros(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [categoriaId]);

    return (
        <main>
            <div className="p-10 min-h-screen bg-blue-50">
                <h1 className="text-4xl font-medium mb-2 text-center tracking-widest text-[#425B98]">
                    {categoriaId ? "LIVROS DA CATEGORIA" : "BIBLIOTECA"}
                </h1>
                <p className="text-muted-foreground mb-10 text-center">
                    {categoriaId
                        ? "Livros filtrados pela categoria selecionada."
                        : "Explore todos os nossos livros disponíveis."}
                </p>

                {loading ? (
                    <p className="text-center">Carregando livros...</p>
                ) : livros.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                        Nenhum livro encontrado.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {livros.map((livro) => (
                            <LivroCartao
                                key={livro.id_livro}
                                livro={mapearLivroParaCartao(livro)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Biblioteca;