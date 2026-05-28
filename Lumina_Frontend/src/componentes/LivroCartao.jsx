import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../contexto/UsuarioContexto";
import LivroModal from "./LivroModal";
import { BotaoPrimario, BotaoSecundario } from "./Botao";

const API = "http://localhost:3000";

export default function LivroCartao({ livro }) {
  const [modalAberto, setModalAberto] = useState(false);
  const { usuario } = useUsuario();
  const navigate = useNavigate();

  const abrirPdf = () => {
    if (!usuario) {
      navigate("/entrar");
      return;
    }
    window.open(`${API}/uploads/${livro.urlPdf}`, "_blank");
  };

  return (
    <>
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={livro.image}
            alt={livro.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h3 className="font-medium mb-1 line-clamp-2">{livro.title}</h3>
          <p className="text-sm text-gray-500 mb-4">{livro.author}</p>

          <div className="flex gap-2">
            <BotaoPrimario
              className="flex-1 flex justify-center items-center"
              onClick={abrirPdf}
            >
              Leia agora
            </BotaoPrimario>

            <BotaoSecundario
              className="flex-1 flex justify-center items-center"
              onClick={() => setModalAberto(true)}
            >
              Ver mais
            </BotaoSecundario>
          </div>
        </div>
      </div>

      {modalAberto && (
        <LivroModal livro={livro} onFechar={() => setModalAberto(false)} />
      )}
    </>
  );
}