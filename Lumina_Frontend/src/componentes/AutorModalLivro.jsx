import { useEffect, useState } from "react";
import { X } from "lucide-react";
import LivroCartao from "./LivroCartao";
import { getLivrosPorAutor } from "../services/api";

const API = "http://localhost:3000";

function mapearLivroParaCartao(livro) {
    return {
        title: livro.titulo,
        author: livro.autor?.nome,
        image: `${API}/uploads/${livro.capa_imagem}`,
        description: livro.descricao ?? "",
        urlPdf: livro.arquivo_pdf ?? "",
    };
}

export default function ModalLivrosAutor({ autor, onFechar }) {
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        getLivrosPorAutor(autor.id_autor).then(({ data }) => setLivros(data));
    }, [autor]);

    useEffect(() => {
        const handler = (e) => e.key === "Escape" && onFechar();
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onFechar]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={onFechar}
        >
            <div
                className="bg-white rounded-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-4xl font-medium">Livros de {autor.nome}</h2>
                    <button onClick={onFechar} className="text-gray-400 hover:text-gray-600">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {livros.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Nenhum livro encontrado para este autor.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {livros.map((livro) => (
                            <LivroCartao
                                key={livro.id_livro}
                                livro={mapearLivroParaCartao(livro)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}