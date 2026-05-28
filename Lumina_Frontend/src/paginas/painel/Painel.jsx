import { useNavigate } from "react-router-dom";
import { BotaoSecundario } from "../../componentes/Botao";
import CardPainel from "../../componentes/PainelCartao";
import { Book, User, Users, Tag } from "lucide-react";

const SECOES = [
    { titulo: "Livros", descricao: "Gerenciar livros cadastrados", rota: "/painel/livros", icone: Book, cor: "blue" },
    { titulo: "Autores", descricao: "Gerenciar autores cadastrados", rota: "/painel/autores", icone: User, cor: "green" },
    { titulo: "Categorias", descricao: "Gerenciar categorias", rota: "/painel/categorias", icone: Tag, cor: "purple" },
    { titulo: "Usuários", descricao: "Visualizar usuários cadastrados", rota: "/painel/usuarios", icone: Users, cor: "pink" },
];

function Painel() {
    const navigate = useNavigate();

    return (
        <div className=" bg-blue-50">
            <div className="max-w-4xl mx-auto pt-24 px-4 pb-24">

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold">PAINEL</h1>

                    <BotaoSecundario className="!bg-white"onClick={() => navigate("/")}>
                        Voltar
                    </BotaoSecundario>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SECOES.map((secao) => (
                        <CardPainel
                            key={secao.rota}
                            titulo={secao.titulo}
                            descricao={secao.descricao}
                            icone={secao.icone}
                            cor={secao.cor}
                            onClick={() => navigate(secao.rota)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Painel;